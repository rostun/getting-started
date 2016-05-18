var gl = {}; //sets to an empty object, prevents null errors (they'll be silent)

//need some initialization function
//basically starting webgl
function initGL(){
	//get reference to canvas DOM Element
	var canvas = document.getElementById("someID");
	
	//try catch block
	try{
		// Try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); 
	}
	catch(e){}
	
	//if we don't have a GL context, give up now 
	//if you can't get gl or it fails, there's a problem
	if(!gl){
		alert("unable to initialize webGL. Your browser might not support it.");
	}

	if(gl){
		//set clear to black, sets every pixel to that color , whatever color you want
		gl.clearColor(0.0, 0.0, 0.0, 1.0); //what does a blank screen look like for me?
		//openGL makes it so that if you have things behind each other it'll draw it in the right order 
		gl.enable(gl.DEPTH_TEST);
		//set the depth function to <=
		gl.depthFunc(gl.LEQUAL); //when it compares two things, uses <=, can be >= whatever you want 
		//clear the color/depth buffers
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
		//now i need to set the viewport, it tells openGL how big your drawing field is
		gl.viewport(0,0, canvas.width, canvas.height);
	}
	
	//initialize shaders 
	var program = initShaders();
	gl.useProgram(program);
	//gets you your variable posiiotn attribute location 
	var positionAttributeLocation = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(positionAttributeLocation); //this is the vertex shader variable
	//initilaize the buffers 
	var buffers = initBuffers();
	//groups of three, type, normalized? stride, offset 
	//stride: how many it skips
		//you can interweave the data so then in your array you ahve position then normal then uv all in one array
		//but here we only have position so our stride is 0 
	//offset: 0 (so if we had normal and uv then we have 6 normals, 6 uvs etc)
	gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
	
	//vertex buffer object, index buffer object 
	//binding those again before we draw
	//that specifies what we want to draw 
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vbo);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.ibo);
	
	//arguments: mode, number, type, offset
	//mode is how you want to draw it, it could be points, it could be lines, triangles, traignle strip, etc 
	//TRIANGLES: draw these unconnected triangles 
	//number: how many indices you are drawing (size of index array whihc is 6)
	//type: type of the number you are giving it, which is either unsigned byte or unsigned short (short is a 16 bit integer, other is 8)
	//offest: where you want to start in the array, but we're starting at the beginning which is 0
	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	return gl;
} 

//new function that is the shader initialization
function initShaders(){
	//open gl provides these functions
	//gl object for the shader and program 
	//argument: what kind of shader do you want to create?
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	//combination of vertex and fragment shaders 
	var shaderProgram = gl.createProgram();
	
	//specifying source code to the shader 
	gl.shaderSource(fragmentShader, getShader("shader-fs"));
	gl.shaderSource(vertexShader, getShader("shader-vs"));
	//attaching it to the shader program 
	gl.attachShader(shaderProgram, fragmentShader);
	gl.attachShader(shaderProgram, vertexShader);
	
	//need to compile shaders and check for errors 
	gl.compileShader(fragmentShader);
	//check if compiled successfully
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		alert("Shader compilation for fragment shader failed.\n"
		+ gl.getShaderInfoLog(fragmentShader));
	}

	gl.compileShader(vertexShader);
	//check if compiled successfully
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		alert("Shader compilation for fragment shader failed.\n"
		+ gl.getShaderInfoLog(vertexShader));
	}
	
	//next step is linking 
	gl.linkProgram(shaderProgram);
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("Linking program failed\n"
		+ gl.getProgramInfoLog(shaderProgram));
	}
	//return shaderProgram object 
	return shaderProgram;
}

//going to get it from DOM, right now its in a script tag we need to make it into a string 
//different from tutorial
//walks throuhg the element you just got and gets the text nodes
//example taking in shader-fs or shader-vs 
function getShader(name){
	var shaderScript, shaderSource, currentChild;
	//grabbing whatever name you inputted
	shaderScript = document.getElementById(name); //grab id
	//if it fails just returns null
	if(!shaderScript){
		return null;
	}
	
	shaderSource = "";
	currentChild = shaderScript.firstChild; 
	//go through the DOM tree
	while(currentChild){
		if(currentChild.nodeType == currentChild.TEXT_NODE){
			shaderSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}
	//returns the string that is shaderSource
	return shaderSource;
}

function initBuffers(){
	//creates a vertex buffer object 
	//just an empty buffer, getting ready to hold stuff
	var quadBuffer = gl.createBuffer();
	
	//put stuff in it 
	//you're saying that this buffer is being bound to the openGL thing that is ARRAY_BUFFER 
	//other one is ELEMENT_ARRAY_BUFFER 
	//binding triBuffer to ARRAY_BUFFER 
	gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
	
	//specifying what the vertices are, position of triangle vertices  
	//set up geometry properly!
	//x y z
	//homogonous add 1, x y z w but w is always 1 becuase basically 
	//it lets you multiple the values with the matrix
	var vertices = [
		 1.0,  1.0, 0.0, //0
		-1.0,  1.0, 0.0, //1
		-1.0, -1.0, 0.0, //2
		 1.0, -1.0, 0.0  //3
	];
	
	//Float32Array is a typed array that just exists in javascript
	//creating an array out of the vertices we just made (vertex information) 
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	//different from guide 
	//index geometry - allows you to reuse vertices 
	//for example a square is made of two triangles = 6 vertices with two vertices reused
	//this allows you to reference an existing vertex 
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	
	//two triangles, 2 1 0, and the second is 3 2 0 
	var indices = [2, 1, 0, 3, 2, 0]; //refrence vertices 
	
	//create array out of vertices we just made, this time giving index information 
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	//javascript shorthand for making an object 
	//two properties (vbo and ibo) which stores both buffer objects to return it 
	var buffers = {vbo:quadBuffer, ibo:indexBuffer};
	return buffers;
}














