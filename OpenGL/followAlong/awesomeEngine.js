var gl = {};

function initGL(){
	console.log("omg we're in the function!");
	var canvas = document.getElementById("someID");
	
	try{
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); 
	}
	catch(e){}
	
	if(!gl){
		alert("unable to initialize webGL. Your browser may not support it");
	}
	
	if(gl){
		gl.clearColor(0.0, 0.0, 0.0, 1.0); 
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);  
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.viewport(0, 0, canvas.width, canvas.height);
	}

	var program = initShaders();
	gl.useProgram(program);

	var positionAttributeLocation = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(positionAttributeLocation); 

	var buffers = initBuffers();
	gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vbo);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.ibo);	
	
	//
	var MVMatrix = Matrix.I(4);
	var trans = Matrix.Translation($V([0.0, 0.0, -6.0])).ensure4x4();
	MVMatrix = MVMatrix.x(trans);
	var MVUniform = gl.getUniformLocation(program, "uMVMatrix");
	gl.uniformMatrix4fv(MVUniform, false, new Float32Array(MVMatrix.flatten())); 
	
	var pMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
	var pUniform = gl.getUniformLocation(program, "uPMatrix");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(pMatrix.flatten()));
	//

	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	
	return gl;
}

function initShaders(){
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);

	var shaderProgram = gl.createProgram();
	
	gl.shaderSource(fragmentShader, getShader("shader-fs"));
	gl.shaderSource(vertexShader, getShader("shader-vs"));

	gl.attachShader(shaderProgram, fragmentShader);
	gl.attachShader(shaderProgram, vertexShader);
 
	gl.compileShader(fragmentShader);

	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		alert("Shader compilation for fragment shader failed.\n"
		+ gl.getShaderInfoLog(fragmentShader));
	}

	gl.compileShader(vertexShader);

	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		alert("Shader compilation for fragment shader failed.\n"
		+ gl.getShaderInfoLog(vertexShader));
	}
	
	gl.linkProgram(shaderProgram);
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("Linking program failed\n"
		+ gl.getProgramInfoLog(shaderProgram));
	}
	
	return shaderProgram;
}

function getShader(name){
	var shaderScript, shaderSource, currentChild;

	shaderScript = document.getElementById(name);
	if(!shaderScript){
		return null;
	}
	
	shaderSource = "";
	currentChild = shaderScript.firstChild; 

	while(currentChild){
		if(currentChild.nodeType == currentChild.TEXT_NODE){
			shaderSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	return shaderSource;
}

function initBuffers(){
	var quadBuffer = gl.createBuffer();
	 
	gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
	
	var vertices = [
		 1.0,  1.0, 0.0, //0
		-1.0,  1.0, 0.0, //1
		-1.0, -1.0, 0.0, //2
		 1.0, -1.0, 0.0  //3
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	var indices = [2, 1, 0, 3, 2, 0]; 
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	var buffers = {vbo:quadBuffer, ibo:indexBuffer};
	return buffers;
}