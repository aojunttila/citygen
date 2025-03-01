export const paramReference = {
    noise:{
        categoryName:"Noise",
        lookup:["simplex","ridged","warped","static","coloredStatic","solidHeight","solidColor"],
        names:["Simplex Noise","Ridged Noise","Warped Noise","Static","Colored Static","Solid Height","Solid Color"],
        values:[
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
                {type:"slider",label:"Scale",input:"float",output:"none",min:0,max:50,default:25},
                {type:"slider",label:"Seed",input:"int",output:"none",min:0,max:1000,default:500},
                {type:"slider",label:"Octaves",input:"int",output:"none",min:1,max:10,default:1},
                {type:"slider",label:"Persistence",input:"float",output:"none",min:0,max:2,default:0.5},
                {type:"slider",label:"Lacunarity",input:"float",output:"none",min:0,max:10,default:2},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const scale = wrapperList[2].data
                    const seed = wrapperList[3].data
                    const octaves = wrapperList[4].data
                    const persistence = wrapperList[5].data
                    const lacunarity = wrapperList[6].data
                    const image = createNoise(256,256,scale,seed,octaves,persistence,lacunarity)
                    nodeObject.wrapperList[0].updateValue(image.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(image)
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
                {type:"slider",label:"Scale",input:"float",output:"none",min:0,max:50,default:25},
                {type:"slider",label:"Seed",input:"int",output:"none",min:0,max:1000,default:500},
                {type:"slider",label:"Octaves",input:"int",output:"none",min:1,max:10,default:1},
                {type:"slider",label:"Persistence",input:"float",output:"none",min:0,max:2,default:0.5},
                {type:"slider",label:"Lacunarity",input:"float",output:"none",min:0,max:10,default:2},
                {type:"slider",label:"Ridge Threshold",input:"float",output:"none",min:0,max:1,default:0.5},

                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const scale = wrapperList[2].data
                    const seed = wrapperList[3].data
                    const octaves = wrapperList[4].data
                    const persistence = wrapperList[5].data
                    const lacunarity = wrapperList[6].data
                    const threshold = wrapperList[7].data
                    const image = createNoise(256,256,scale,seed,octaves,persistence,lacunarity,threshold)
                    nodeObject.wrapperList[0].updateValue(image.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(image)
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
                {type:"slider",label:"Scale",input:"float",output:"none",min:0,max:50,default:25},
                {type:"slider",label:"Seed",input:"int",output:"none",min:0,max:1000,default:500},
                {type:"slider",label:"Octaves",input:"int",output:"none",min:1,max:10,default:1},
                {type:"slider",label:"Persistence",input:"float",output:"none",min:0,max:2,default:0.5},
                {type:"slider",label:"Lacunarity",input:"float",output:"none",min:0,max:10,default:2},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const scale = wrapperList[2].data
                    const seed = wrapperList[3].data
                    const octaves = wrapperList[4].data
                    const persistence = wrapperList[5].data
                    const lacunarity = wrapperList[6].data
                    const image = createNoise(256,256,scale,seed,octaves,persistence,lacunarity)
                    nodeObject.wrapperList[0].updateValue(image.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(image)
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
                {type:"slider",label:"Seed",input:"int",output:"none",min:0,max:1000,default:500},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    var rand = new Alea(wrapperList[2].data);
                    const canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext("2d");
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            
                            const index = (y * canvas.width + x) * 4;
                            const h = rand.next()*255
                            data[index] = h;    
                            data[index + 1] = h;
                            data[index + 2] = h;
                            data[index + 3] = 255;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    nodeObject.wrapperList[0].updateValue(ctx.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(ctx)
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"colormap"},
                {type:"slider",label:"Seed",input:"int",output:"none",min:0,max:1000,default:500},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    var rand = new Alea(wrapperList[2].data);
                    const canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext("2d");
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            
                            const index = (y * canvas.width + x) * 4;
                            data[index] = rand.next()*255;    
                            data[index + 1] = rand.next()*255;
                            data[index + 2] = rand.next()*255;
                            data[index + 3] = 255;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    nodeObject.wrapperList[0].updateValue(ctx.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(ctx)
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
                {type:"slider",label:"Height",input:"int",output:"none",min:0,max:255,default:255},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const h = wrapperList[2].data;
                    const canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext("2d");
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            const index = (y * canvas.width + x) * 4;
                            data[index] = h;    
                            data[index + 1] = h;
                            data[index + 2] = h;
                            data[index + 3] = 255;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    nodeObject.wrapperList[0].updateValue(ctx.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(ctx)
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"right",label:"Color Map",input:"none",output:"colormap"},
                {type:"slider",label:"Red",input:"int",output:"none",min:0,max:255,default:255},
                {type:"slider",label:"Green",input:"int",output:"none",min:0,max:255,default:255},
                {type:"slider",label:"Blue",input:"int",output:"none",min:0,max:255,default:255},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const red = wrapperList[2].data;
                    const green = wrapperList[3].data
                    const blue = wrapperList[4].data
                    const canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext("2d");
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            const index = (y * canvas.width + x) * 4;
                            data[index] = red;    
                            data[index + 1] = green;
                            data[index + 2] = blue;
                            data[index + 3] = 255;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    nodeObject.wrapperList[0].updateValue(ctx.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[1].updateValue(ctx)
                }}
            ],
        ]
    },
    roads:{
        categoryName:"Roads",
        lookup:["roadGrid","heightedRoadGrid"],
        names:["Road Grid","Road Grid 2"],
        values:[
            [
                {type:"display",label:"Road Map",input:"none",output:"none"},
                {type:"label",justify:"right",label:"Road Map",input:"none",output:"roadmap"},
                {type:"slider",label:"Road Width",control:"float",input:"none",width:"150px",output:"none",min:0.1,max:10,default:5},
                {type:"slider",label:"X Spacing",control:"float",input:"none",width:"150px",output:"none",min:5,max:50,default:30},
                {type:"slider",label:"Y Spacing",control:"float",input:"none",width:"150px",output:"none",min:5,max:50,default:30},
                {type:"slider",label:"X Offset",control:"int",input:"none",width:"150px",output:"none",min:0,max:50,default:0},
                {type:"slider",label:"Y Offset",control:"int",input:"none",width:"150px",output:"none",min:0,max:50,default:0},

                {type:"refreshFunction",function:(nodeObject)=>{
                    const paramListElement = nodeObject.element.children[1];
                    const width = paramListElement.children[2].data;
                    const boardWidth = 256
                    const Xspacing = paramListElement.children[3].data;
                    const Zspacing = paramListElement.children[4].data;
                    const Xoffset = paramListElement.children[5].data;
                    const Zoffset = paramListElement.children[6].data;
                    
                    const roadData=[]
                    for(let x=-1;x<(256/Xspacing);x++){
                        for(let z=-1;z<(256/Zspacing);z++){
                            const zPos = z*Zspacing+Zoffset
                            const xPos = x*Xspacing+Xoffset
                            if(zPos<256&&zPos>0){
                                roadData.push({points:[
                                    xPos>0?xPos:0,0,zPos,
                                    xPos+Xspacing<256?xPos+Xspacing:256,0,zPos,
                                ],width:width})
                            }
                            
                            if(xPos<256&&xPos>0){
                                roadData.push({points:[
                                    xPos,0,zPos>0?zPos:0,
                                    xPos,0,zPos+Zspacing<256?zPos+Zspacing:256,
                                ],width:width})
                            }
                        }
                    }

                    paramListElement.children[1].updateValue(roadData)

                    const canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext("2d");
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            const index = (y * canvas.width + x) * 4;
                            data[index] = 255;    
                            data[index + 1] = 255;
                            data[index + 2] = 0;
                            data[index + 3] = 255;
                        }
                    }
                    for(const a of roadData){
                        const x1 = a.points[0]
                        const z1 = a.points[2]
                        const x2 = a.points[3]
                        const z2 = a.points[5]
                        const width = a.width
                        ctx.beginPath();
                        ctx.moveTo(x1, z1);
                        ctx.lineTo(x2, z2);
                        ctx.lineWidth = width;
                        ctx.strokeStyle = "white";
                        ctx.stroke();
                    }
                    nodeObject.wrapperList[0].updateValue(ctx.canvas.toDataURL("image/png"))

                }}
                
            ],
            [
                {type:"display",label:"Road Map",input:"none",output:"none"},
                {type:"label",justify:"right",label:"Road Map",input:"none",output:"roadmap"},
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},

                {type:"slider",label:"Road Width",control:"float",input:"none",width:"150px",output:"none",min:0.1,max:10,default:5},
                {type:"slider",label:"X Spacing",control:"float",input:"none",width:"150px",output:"none",min:5,max:50,default:30},
                {type:"slider",label:"Y Spacing",control:"float",input:"none",width:"150px",output:"none",min:5,max:50,default:30},
                {type:"slider",label:"X Offset",control:"int",input:"none",width:"150px",output:"none",min:0,max:50,default:0},
                {type:"slider",label:"Y Offset",control:"int",input:"none",width:"150px",output:"none",min:0,max:50,default:0},
                {type:"slider",label:"Height Offset",control:"float",input:"none",width:"150px",output:"none",min:0,max:10,default:5},
                {type:"slider",label:"Resolution",control:"int",input:"none",width:"150px",output:"none",min:1,max:20,default:10},

                {type:"refreshFunction",function:(nodeObject)=>{
                    const paramListElement = nodeObject.element.children[1];
                    const image = paramListElement.children[2].data;
                    const width = paramListElement.children[3].data;
                    const boardWidth = 256
                    const Xspacing = paramListElement.children[4].data;
                    const Zspacing = paramListElement.children[5].data;
                    const Xoffset = paramListElement.children[6].data;
                    const Zoffset = paramListElement.children[7].data;
                    const heightOffset = paramListElement.children[8].data;
                    const resolution = paramListElement.children[9].data;
                    
                    const roadData=[]
                    if(image==null){return}
                    const heightData = image.getImageData(0, 0, image.canvas.width, image.canvas.height).data;
                    const pointCount = resolution+1;
                    function c(a){
                        return a>0?(a<255?a:256):0
                    }
                    for(let x=-1;x<(256/Xspacing);x++){
                        for(let z=-1;z<(256/Zspacing);z++){
                            const zPos = z*Zspacing+Zoffset
                            const xPos = x*Xspacing+Xoffset
                                if(zPos<256&&zPos>0){
                                const heightDiff = 0.21
                                let pointData = []
                                for(let i=0;i<pointCount+1;i++){
                                    let xPos2 = xPos+(i/pointCount)*Xspacing
                                    xPos2=xPos2>0?(xPos2<255?xPos2:255):0
                                    const height = heightData[(Math.floor(xPos2)+Math.floor(zPos)*image.canvas.width)*4]*heightDiff
                                    
                                    pointData.push(xPos2>0?xPos2:0)
                                    pointData.push(height-30+heightOffset)
                                    //console.log(height-30+heightOffset)
                                    pointData.push(zPos)
                                }
                                
                                roadData.push({points:pointData,width:width,pointCount:pointCount})
                            }
                            
                            if(xPos<256&&xPos>0){
                                const heightDiff = 0.21
                                let pointData = []
                                for(let i=0;i<pointCount+1;i++){
                                    let zPos2 = zPos+(i/pointCount)*Zspacing
                                    zPos2=zPos2>0?(zPos2<255?zPos2:255):0
                                    const height = heightData[(Math.floor(c(xPos))+Math.floor(zPos2)*image.canvas.width)*4]*heightDiff
                                    pointData.push(xPos)
                                    pointData.push(height-30+heightOffset)
                                    pointData.push(zPos2>0?zPos2:0)
                                }
                                roadData.push({points:pointData,width:width,pointCount:pointCount})
                            }
                        }
                    }

                    paramListElement.children[1].updateValue(roadData)

                    const canvas = document.createElement("canvas");
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext("2d");
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            const index = (y * canvas.width + x) * 4;
                            data[index] = 255;    
                            data[index + 1] = 255;
                            data[index + 2] = 0;
                            data[index + 3] = 255;
                        }
                    }
                    for(const a of roadData){
                        const x1 = a.points[0]
                        const z1 = a.points[2]
                        const x2 = a.points[3+(a.pointCount-1||0)*3]
                        const z2 = a.points[5+(a.pointCount-1||0)*3]
                        const width = a.width
                        ctx.beginPath();
                        ctx.moveTo(x1, z1);
                        ctx.lineTo(x2, z2);
                        ctx.lineWidth = width;
                        ctx.strokeStyle = "white";
                        ctx.stroke();
                    }
                    nodeObject.wrapperList[0].updateValue(ctx.canvas.toDataURL("image/png"))

                }}
                
            ],
        ]

    },
    buildings:{
        categoryName:"Buildings",
        lookup:["buildingScatter","buildingGrid","buildingSet"],
        names:["Random Scatter","Building Grid","Building Set"],
        values:[
            [
                {type:"label",justify:"right",label:"Building Map",input:"none",output:"buildingmap"},
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
                {type:"label",justify:"left",label:"Building Set",input:"buildingset",output:"none"},
                {type:"slider",label:"Height Offset",control:"int",input:"none",width:"150px",output:"none",min:-100,max:100,default:60},
                {type:"slider",label:"Height Multi",control:"float",input:"none",width:"150px",output:"none",min:0,max:2,default:0.21},
                {type:"slider",label:"Amount",control:"int",input:"none",width:"150px",output:"none",min:1,max:100,default:10},

                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const image = wrapperList[1].data
                    const p2 = wrapperList[2].data
                    const p3 = wrapperList[3].data
                    const p4 = wrapperList[4].data
                    const p5 = wrapperList[5].data
                    var rand = new Alea(p5);


                    if(image!=null&&p2!=null&&p2.length>0){
                        const heightData = image.getImageData(0, 0, image.canvas.width, image.canvas.height).data;
                        let buildingData = []
                        for(let i=0;i<p5;i++){
                            const tempData = p2[Math.floor(Math.random()*p2.length)]

                            const x = rand.next()*255
                            const z = rand.next()*255

                            const scale = Math.random()*3+1
                            const y = heightData[(Math.floor(x)+Math.floor(z)*image.canvas.width)*4]*p4+p3;

                            buildingData.push({x:x,y:y,z:z,scale:tempData.scale,xWidth:tempData.xWidth,zWidth:tempData.zWidth,height:tempData.height,baseColor:tempData.baseColor,windowColor:tempData.windowColor})
                        }
                        wrapperList[0].updateValue(buildingData)
                    }
                
                }}
            ],
            [
                {type:"label",justify:"right",label:"Building Map",input:"none",output:"buildingmap"},
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
                {type:"label",justify:"left",label:"Building Set",input:"buildingset",output:"none"},
                {type:"label",justify:"left",label:"Road Map",input:"roadmap",output:"none"},

                {type:"slider",label:"Height Offset",control:"int",input:"none",width:"150px",output:"none",min:-100,max:100,default:60},
                {type:"slider",label:"Height Multi",control:"float",input:"none",width:"150px",output:"none",min:0,max:2,default:0.21},
                {type:"slider",label:"Amount",control:"int",input:"none",width:"150px",output:"none",min:1,max:100,default:10},

                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const image = wrapperList[1].data
                    const p2 = wrapperList[2].data
                    const roads = wrapperList[3].data
                    const p3 = wrapperList[4].data
                    const p4 = wrapperList[5].data
                    const p5 = wrapperList[6].data
                    var rand = new Alea(p5);


                    if(image!=null&&p2!=null&&p2.length>0&&roads!=null){
                        const heightData = image.getImageData(0, 0, image.canvas.width, image.canvas.height).data;
                        let buildingData = []
                        for(let i=0;i<p5;i++){
                            const road = roads[Math.floor(Math.random()*roads.length)]
                            const roadPoint = road.points[Math.floor(Math.random() * road.points.length / 3) * 3];
                            
                            const tempData = p2[Math.floor(Math.random()*p2.length)]

                            const xOffset = 0.2*tempData.scale*tempData.xWidth+7; // Distance from the road
                            const zOffset = 0.2*tempData.scale*tempData.zWidth+7; // Distance from the road
                            const direction = Math.random() < 0.5 ? 1 : -1; // Randomly choose side of the road

                            const x = roadPoint + direction * xOffset;
                            const z = road.points[2] + direction * zOffset;
                            /*
                            const x = rand.next()*255
                            const z = rand.next()*255
                            */
                            const scale = Math.random()*3+1
                            const y = heightData[(Math.floor(x)+Math.floor(z)*image.canvas.width)*4]*p4+p3;
                            if(x>0&&x<256&&z>0&&z<256)
                            {
                                buildingData.push({x:x,y:y,z:z,scale:tempData.scale,xWidth:tempData.xWidth,zWidth:tempData.zWidth,height:tempData.height,baseColor:tempData.baseColor,windowColor:tempData.windowColor})
                            }
                        }
                        wrapperList[0].updateValue(buildingData)
                    }
                
                }}
            ],
            [
                {type:"label",justify:"right",label:"Building Set",input:"none",output:"buildingset"},
                {type:"slider",label:"Scale",control:"float",input:"none",width:"150px",output:"none",min:0,max:10,default:3},
                {type:"slider",label:"Height",control:"int",input:"none",width:"150px",output:"none",min:1,max:50,default:10},
                {type:"slider",label:"Width",control:"int",input:"none",width:"150px",output:"none",min:1,max:25,default:7},
                {type:"slider",label:"Depth",control:"int",input:"none",width:"150px",output:"none",min:1,max:25,default:7},
                
                {type:"label",justify:"left",label:"Base Color:",input:"none",output:"none"},
                {type:"color",label:"",input:"none",output:"none",width:"150px",refreshFunction:(wrapper)=>{
                    const paramList = wrapper.parentElement.children;
                    if(paramList.length==21){
                        wrapper.data=("rgba("+paramList[7].data+", "+paramList[8].data+", "+paramList[9].data+", 1)")
                        wrapper.style.backgroundColor=("rgba("+paramList[7].data+", "+paramList[8].data+", "+paramList[9].data+", 1)")
                    }
                }},
                {type:"slider",label:"R",control:"int",input:"none",output:"none",width:"45px",min:0,max:255,default:40,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[6].refreshFunction(wrapper.parentElement.children[6])
                }},
                {type:"slider",label:"G",control:"int",input:"none",output:"none",width:"45px",min:0,max:255,default:40,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[6].refreshFunction(wrapper.parentElement.children[6])
                }},
                {type:"slider",label:"B",control:"int",input:"none",output:"none",width:"45px",min:0,max:255,default:40,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[6].refreshFunction(wrapper.parentElement.children[6])
                }},
                {type:"label",justify:"left",label:"Window Color:",input:"none",output:"none"},
                {type:"color",label:"",input:"none",output:"none",width:"150px",refreshFunction:(wrapper)=>{
                    const paramList = wrapper.parentElement.children;
                    if(paramList.length==21){
                        wrapper.data=("rgba("+paramList[12].data+", "+paramList[13].data+", "+paramList[14].data+", 1)")
                        wrapper.style.backgroundColor=("rgba("+paramList[12].data+", "+paramList[13].data+", "+paramList[14].data+", 1)")
                    }
                }},
                {type:"slider",label:"R",control:"int",input:"none",output:"none",width:"45px",min:0,max:255,default:250,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[11].refreshFunction(wrapper.parentElement.children[11])
                }},
                {type:"slider",label:"G",control:"int",input:"none",output:"none",width:"45px",min:0,max:255,default:200,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[11].refreshFunction(wrapper.parentElement.children[11])
                }},
                {type:"slider",label:"B",control:"int",input:"none",output:"none",width:"45px",min:0,max:255,default:0,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[11].refreshFunction(wrapper.parentElement.children[11])
                }},

                {type:"slider",label:"Amount",control:"int",input:"none",width:"150px",output:"none",min:0,max:100,default:10},
                {type:"slider",label:"Scale Variance",control:"float",input:"none",width:"150px",output:"none",min:0,max:4,default:0},
                {type:"slider",label:"Height Variance",control:"float",input:"none",width:"150px",output:"none",min:0,max:4,default:0},
                {type:"slider",label:"Width Variance",control:"float",input:"none",width:"150px",output:"none",min:0,max:4,default:0},
                {type:"slider",label:"Depth Variance",control:"float",input:"none",width:"150px",output:"none",min:0,max:4,default:0},
                {type:"slider",label:"Window Variance",control:"float",input:"none",width:"150px",output:"none",min:0,max:4,default:0},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const scale = nodeObject.wrapperList[1].data;
                    const height = nodeObject.wrapperList[2].data;
                    const width = nodeObject.wrapperList[3].data;
                    const depth = nodeObject.wrapperList[4].data;

                    const baseColor = [wrapperList[7].data,wrapperList[8].data,wrapperList[9].data,1]
                    const windowColor = [wrapperList[12].data,wrapperList[13].data,wrapperList[14].data,1]

                    
                    
                    const amount = nodeObject.wrapperList[15].data;
                    const scalevar = nodeObject.wrapperList[16].data;
                    const heightvar = nodeObject.wrapperList[17].data;
                    const widthvar = nodeObject.wrapperList[18].data;
                    const depthvar = nodeObject.wrapperList[19].data;
                    const windowvar = nodeObject.wrapperList[20].data;

                    let buildingSet = []

                    const baseColorF = "rgba("+baseColor[0]+","+baseColor[1]+","+baseColor[2]+",1)"
                    

                    for(let i=0;i<amount;i++){
                        const colorVar = ((Math.random()-0.5)*windowvar)+1
                        const windowColorF = "rgba("+windowColor[0]*colorVar+","+windowColor[1]*colorVar+","+windowColor[2]*colorVar+",1)"
                        const scaleF = Math.random()*scalevar+scale
                        const heightF = Math.round(Math.random()*heightvar+height)
                        const widthF = Math.round(Math.random()*widthvar+width)
                        const depthF = Math.round(Math.random()*depthvar+depth)

                        buildingSet.push({scale:scaleF,xWidth:widthF,zWidth:depthF,height:heightF,baseColor:baseColorF,windowColor:windowColorF})
                    }
                    wrapperList[0].updateValue(buildingSet)
                }}
            ],
        ]

    },
    modifiers:{
        categoryName:"Modifiers",
        lookup:["heightAdjust","colorAdjust","heightRamp","colorRamp"],
        names:["Height Adjust","Color Adjust","Height Ramp","Color Ramp"],
        values:[
            [
            {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
            {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
            {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
            {type:"slider",label:"Contrast",input:"float",output:"float",min:0,max:2,default:1},
            {type:"slider",label:"Gain",input:"float",output:"float",min:-1,max:1,default:0},
            {type:"slider",label:"Lift",input:"float",output:"float",min:-1,max:1,default:0},
            {type:"slider",label:"Gamma",input:"float",output:"float",min:0,max:2,default:1},
            {type:"slider",label:"Brightness",input:"float",output:"float",min:0,max:2,default:1},
            {type:"refreshFunction",function:(nodeObject)=>{
                const wrapperList = nodeObject.wrapperList;
                const image = wrapperList[1].data
                const contrast = wrapperList[3].data
                const gain = wrapperList[4].data
                const lift = wrapperList[5].data
                const gamma = wrapperList[6].data
                const brightness = wrapperList[7].data
                if(image!=null){
                    const t1 = Date.now()
                    const imageData = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
                    const canvas = document.createElement("canvas");
                    canvas.width = image.canvas.width;
                    canvas.height = image.canvas.height;
                    const image2 = canvas.getContext("2d");
                    const data = imageData.data;
                    const gammaCorrection = 1 / gamma;
                    const lookupTable = new Uint8Array(256);
                    for (let i = 0; i < 256; i++){
                        lookupTable[i] = clamp(((i-128)*contrast)+128,0,255)
                        lookupTable[i] = clamp(lookupTable[i]*(1-Math.abs(0-gain))+255*(gain>0?gain:0),0,255)
                        lookupTable[i] = clamp(lookupTable[i]+lift*256,0,255)
                        lookupTable[i] = clamp(Math.min(255, Math.max(0, Math.pow(lookupTable[i] / 255, gammaCorrection) * 255)),0,255)
                        lookupTable[i] = clamp(lookupTable[i]*brightness,0,255)
                    }   
                    function clamp(value, min, max) {
                        return Math.max(min, Math.min(max, value));
                    }
                    for (let i = 0; i < data.length; i += 4) {       
                        data[i] = lookupTable[data[i]];
                        data[i + 1] = lookupTable[data[i + 1]];
                        data[i + 2] = lookupTable[data[i + 2]];
                    }
                    image2.putImageData(imageData, 0, 0);
                    nodeObject.wrapperList[0].updateValue(image2.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[2].updateValue(image2)
                }
            }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none",min:0,max:10,default:7.5},
                {type:"label",justify:"left",label:"Height Map",input:"colormap",output:"none"},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"colormap"},
                {type:"slider",label:"Contrast",input:"float",output:"float",min:0,max:2,default:1},
                {type:"slider",label:"Gain",input:"float",output:"float",min:-1,max:1,default:0},
                {type:"slider",label:"Lift",input:"float",output:"float",min:-1,max:1,default:0},
                {type:"slider",label:"Gamma",input:"float",output:"float",min:0,max:2,default:1},
                {type:"slider",label:"Brightness",input:"float",output:"float",min:0,max:2,default:1},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const image = wrapperList[1].data
                    const contrast = wrapperList[3].data
                    const gain = wrapperList[4].data
                    const lift = wrapperList[5].data
                    const gamma = wrapperList[6].data
                    const brightness = wrapperList[7].data
                    if(image!=null){
                        const t1 = Date.now()
                        const imageData = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
                        const canvas = document.createElement("canvas");
                        canvas.width = image.canvas.width;
                        canvas.height = image.canvas.height;
                        const image2 = canvas.getContext("2d");
                        const data = imageData.data;
                        const gammaCorrection = 1 / gamma;
                        const lookupTable = new Uint8Array(256);
                        for (let i = 0; i < 256; i++){
                            lookupTable[i] = clamp(((i-128)*contrast)+128,0,255)
                            lookupTable[i] = clamp(lookupTable[i]*(1-Math.abs(0-gain))+255*(gain>0?gain:0),0,255)
                            lookupTable[i] = clamp(lookupTable[i]+lift*256,0,255)
                            lookupTable[i] = clamp(Math.min(255, Math.max(0, Math.pow(lookupTable[i] / 255, gammaCorrection) * 255)),0,255)
                            lookupTable[i] = clamp(lookupTable[i]*brightness,0,255)
                        }   
                        function clamp(value, min, max) {
                            return Math.max(min, Math.min(max, value));
                        }
                        for (let i = 0; i < data.length; i += 4) {       
                            data[i] = lookupTable[data[i]];
                            data[i + 1] = lookupTable[data[i + 1]];
                            data[i + 2] = lookupTable[data[i + 2]];
                        }
                        image2.putImageData(imageData, 0, 0);
                        nodeObject.wrapperList[0].updateValue(image2.canvas.toDataURL("image/png"))
                        nodeObject.wrapperList[2].updateValue(image2)
                    }
                }}
            ],
            [
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap",width:"290px"},
                {type:"ramp",label:"Ramp",input:"none",output:"none",width:"290px",min:0,max:2,default:1},
                {type:"slider",label:"Position",control:"float",input:"none",width:"290px",output:"none",min:0,max:1,default:0},
                {type:"color",label:"",input:"none",output:"none",width:"290px",grayscale:true,refreshFunction:(wrapper)=>{
                    const paramList = wrapper.parentElement.children;
                    if(paramList.length==6){
                        wrapper.data=("rgba("+paramList[5].data+", "+paramList[5].data+", "+paramList[5].data+", 1)")
                        wrapper.style.backgroundColor=("rgba("+paramList[5].data+", "+paramList[5].data+", "+paramList[5].data+", 1)")
                        paramList[2].selectedPoint.setColor([paramList[5].data,paramList[5].data,paramList[5].data,255])
                    }
                }},
                {type:"slider",label:"Height",control:"int",input:"none",output:"none",width:"290px",min:0,max:255,default:0,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[4].refreshFunction(wrapper.parentElement.children[4])
                }},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const image = wrapperList[0].data
                    const colorLookup = wrapperList[2].data
                    if(image!=null){
                        const imageData = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
                        const canvas = document.createElement("canvas");
                        canvas.width = image.canvas.width;
                        canvas.height = image.canvas.height;
                        const image2 = canvas.getContext("2d");
                        const data = imageData.data;
                        for (let i = 0; i < data.length; i += 4) {       
                            data[i] = colorLookup[data[i]*4]
                            data[i + 1] = colorLookup[data[i+1]*4+1]
                            data[i + 2] = colorLookup[data[i+2]*4+2]
                        }
                        image2.putImageData(imageData, 0, 0);
                        nodeObject.wrapperList[1].updateValue(image2)
                    }
                }}
            ],
            [
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
                {type:"label",justify:"right",label:"Color Map",input:"none",output:"colormap",width:"310px"},
                {type:"ramp",label:"Ramp",input:"none",output:"none",width:"310px",min:0,max:2,default:1},
                {type:"slider",label:"Position",control:"float",input:"none",width:"310px",output:"none",min:0,max:1,default:0,refreshFunction:(wrapper)=>{
                    const paramList = wrapper.parentElement.children;
                    if(paramList.length==8){
                        paramList[2].selectedPoint.setPosition(paramList[3].data)
                    }
                }},
                {type:"color",label:"",input:"none",output:"none",width:"310px",refreshFunction:(wrapper)=>{
                    const paramList = wrapper.parentElement.children;
                    if(paramList.length==8){
                        wrapper.data=("rgba("+paramList[5].data+", "+paramList[6].data+", "+paramList[7].data+", 1)")
                        wrapper.style.backgroundColor=("rgba("+paramList[5].data+", "+paramList[6].data+", "+paramList[7].data+", 1)")
                        paramList[2].selectedPoint.setColor([paramList[5].data,paramList[6].data,paramList[7].data,255])
                    }
                }},
                {type:"slider",label:"Red",control:"int",input:"none",output:"none",width:"100px",min:0,max:255,default:0,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[4].refreshFunction(wrapper.parentElement.children[4])
                }},
                {type:"slider",label:"Green",control:"int",input:"none",output:"none",width:"99px",min:0,max:255,default:0,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[4].refreshFunction(wrapper.parentElement.children[4])
                }},
                {type:"slider",label:"Blue",control:"int",input:"none",output:"none",width:"99px",min:0,max:255,default:0,refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[4].refreshFunction(wrapper.parentElement.children[4])
                }},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const image = wrapperList[0].data
                    const colorLookup = wrapperList[2].data
                    if(image!=null){
                        const imageData = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
                        const canvas = document.createElement("canvas");
                        canvas.width = image.canvas.width;
                        canvas.height = image.canvas.height;
                        const image2 = canvas.getContext("2d");
                        const data = imageData.data;
                        for (let i = 0; i < data.length; i += 4) {       
                            data[i] = colorLookup[data[i]*4]
                            data[i + 1] = colorLookup[data[i+1]*4+1]
                            data[i + 2] = colorLookup[data[i+2]*4+2]
                        }
                        image2.putImageData(imageData, 0, 0);
                        nodeObject.wrapperList[1].updateValue(image2)
                    }
                }}
            ]
        ]
    },
    maps:{
        categoryName:"Maps",
        lookup:["slopeMap"],
        names:["Slope Map"],
        values:[
            [
                {type:"display",label:"",input:"none",output:"none"},
            {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
            {type:"label",justify:"right",label:"Slope Map",input:"none",output:"heightmap"},
            {type:"slider",label:"Multiply",control:"float",input:"none",output:"none",min:0,max:16,default:1},
            {type:"refreshFunction",function:(nodeObject)=>{
                const wrapperList = nodeObject.wrapperList;
                const image = wrapperList[1].data
                //const contrast = wrapperList[3].data
                //const gain = wrapperList[4].data
                //const lift = wrapperList[5].data
                //const gamma = wrapperList[6].data
                //const brightness = wrapperList[7].data
                if(image!=null){
                    const t1 = Date.now()
                    const imageData = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
                    const canvas = document.createElement("canvas");
                    canvas.width = image.canvas.width;
                    canvas.height = image.canvas.height;
                    const image2 = canvas.getContext("2d");
                    const imageData2 = image2.getImageData(0, 0, image.canvas.width, image.canvas.height);
                    const data = imageData.data;
                    const data2 = imageData2.data;
                    const lookupTable = new Uint8Array(256);
                    function clamp(value, min, max) {
                        return Math.max(min, Math.min(max, value));
                    }
                    for (let i = 0; i < data.length; i += 4) {    
                        const negX = data[i-4] || data[i];
                        const posX = data[i+4] || data[i];
                        const negY = data[i-imageData.width*4] || data[i];
                        const posY = data[i+imageData.width*4] || data[i];
                        const slopeX = Math.abs(negX - posX);
                        const slopeY = Math.abs(negY - posY);
                        const slope = Math.sqrt(slopeX * slopeX + slopeY * slopeY)*wrapperList[3].data;
                        data2[i] = slope;
                        data2[i + 1] = slope;
                        data2[i + 2] = slope;   
                        data2[i + 3] = 255;   
                    }
                    image2.putImageData(imageData2, 0, 0);
                    nodeObject.wrapperList[0].updateValue(image2.canvas.toDataURL("image/png"))
                    nodeObject.wrapperList[2].updateValue(image2)
                }
            }}
            ],
        ]
    },
    math:{
        categoryName:"Math",
        lookup:["floatMath","floatOperation","intMath","intOperation"],
        names:["Float Math","Float Operation","Int Math","Int Operation"],
        value:[
            [
                
            ],
        ]
    },
    convert:{
        categoryName:"Convert",
        lookup:["heightToColor","colorToHeight","floatToInt","intToFloat"],
        names:["Height to Color","Color to Height","Float to Int","Int to Float"],
        values:[
            [
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none",refreshFunction:(wrapper)=>{
                    wrapper.parentElement.children[1].updateValue(wrapper.data)
                }},
                {type:"label",justify:"right",label:"Color Map",input:"none",output:"colormap"},
            ],
            [
                {type:"label",justify:"left",label:"Color Map",input:"colormap",output:"none",refreshFunction:(wrapper)=>{
                    const image = wrapper.data
                    if(image!=null){
                        const imageData = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
                        const data = imageData.data;
                        for (let i = 0; i < data.length; i += 4) {   
                            const h = (data[i]+data[i+1]+data[i+2])/3    
                            data[i] = h
                            data[i + 1] = h
                            data[i + 2] = h
                        }
                        image.putImageData(imageData, 0, 0);
                        wrapper.parentElement.children[1].updateValue(image)
                    }
                }},
                {type:"label",justify:"right",label:"Height Map",input:"none",output:"heightmap"},
            ],
            [   
            ],
        ]

    },
    flow:{
        categoryName:"Flow",
        lookup:["mergeHeight","mergeColor"],
        names:["Merge Height","Merge Color"],
        values:[
            [
                {type:"display",label:"Height Map",input:"none",output:"none"},
                {type:"dropdown",label:"Merge Mode",input:"none",output:"none",width:"150px",options:["Normal","Add","Subtract","Multiply","Darker Color","Lighter Color"],default:"Normal"},
                {type:"label",justify:"left",label:"Background",input:"heightmap",output:"none"},
                {type:"label",justify:"left",label:"Foreground",input:"heightmap",output:"none"},
                {type:"label",justify:"left",label:"Mask",input:"heightmap",output:"none"},
                
                {type:"slider",label:"Blend",control:"float",input:"none",output:"none",width:"150px",min:0,max:1,default:1},
                {type:"label",justify:"right",label:"Output",input:"none",output:"heightmap"},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const blendMode = wrapperList[1].data
                    const background = wrapperList[2].data
                    const foreground = wrapperList[3].data
                    const blend = wrapperList[5].data
                    if(background!=null&&foreground!=null){
                        const backgroundData = background.getImageData(0, 0, background.canvas.width, background.canvas.height);
                        const foregroundData = foreground.getImageData(0, 0, foreground.canvas.width, foreground.canvas.height);
                        const canvas = document.createElement("canvas");
                        canvas.width = background.canvas.width;
                        canvas.height = background.canvas.height;
                        const image2 = canvas.getContext("2d");
                        const data = backgroundData.data;
                        const data2 = foregroundData.data;
                        function clamp(value, min, max) {
                            return Math.max(min, Math.min(max, value));
                        }
                        
                        for (let i = 0; i < data.length; i += 4) {  
                            if(blendMode=="Normal"){     
                                data[i] = data[i]*(1-blend)+data2[i]*blend;
                                data[i + 1] = data[i+1]*(1-blend)+data2[i+1]*blend
                                data[i + 2] = data[i+2]*(1-blend)+data2[i+2]*blend
                            }else if(blendMode=="Add"){
                                data[i] = data[i]+data2[i]*blend;
                                data[i + 1] = data[i+1]+data2[i+1]*blend
                                data[i + 2] = data[i+2]+data2[i+2]*blend
                            }else if(blendMode=="Subtract"){
                                data[i] = data[i]-data2[i]*blend;
                                data[i + 1] = data[i+1]-data2[i+1]*blend
                                data[i + 2] = data[i+2]-data2[i+2]*blend
                            }else if(blendMode=="Multiply"){
                                data[i] = ((data[i]/255)*((data2[i]/255)*blend+(1-blend)))*255;   
                                data[i + 1] = ((data[i+1]/255)*((data2[i+1]/255)*blend+(1-blend)))*255;
                                data[i + 2] = ((data[i+2]/255)*((data2[i+2]/255)*blend+(1-blend)))*255;
                            }else if(blendMode=="Darker Color"){
                                data[i] = data[i]*(1-blend)+(data[i]<data2[i]?data[i]:data2[i])*blend;
                                data[i + 1] = data[i+1]*(1-blend)+(data[i+1]<data2[i+2]?data[i+1]:data2[i+1])*blend;
                                data[i + 2] = data[i+2]*(1-blend)+(data[i+2]<data2[i+2]?data[i+2]:data2[i+2])*blend;
                            }else if(blendMode=="Lighter Color"){
                                data[i] = data[i]*(1-blend)+(data[i]>data2[i]?data[i]:data2[i])*blend;
                                data[i + 1] = data[i+1]*(1-blend)+(data[i+1]>data2[i+2]?data[i+1]:data2[i+1])*blend;
                                data[i + 2] = data[i+2]*(1-blend)+(data[i+2]>data2[i+2]?data[i+2]:data2[i+2])*blend;
                            }
                        }
                        image2.putImageData(backgroundData, 0, 0);
                        nodeObject.wrapperList[0].updateValue(image2.canvas.toDataURL("image/png"))
                        nodeObject.wrapperList[6].updateValue(image2);
                    }
                }}
            ],
            [
                {type:"display",label:"Height Map",input:"none",output:"none"},
                {type:"dropdown",label:"Merge Mode",input:"none",output:"none",width:"150px",options:["Normal","Add","Subtract","Multiply","Darker Color","Lighter Color"],default:"Normal"},
                {type:"label",justify:"left",label:"Background",input:"colormap",output:"none"},
                {type:"label",justify:"left",label:"Foreground",input:"colormap",output:"none"},
                {type:"label",justify:"left",label:"Mask",input:"heightmap",output:"none"},
                
                {type:"slider",label:"Blend",control:"float",input:"none",output:"none",width:"150px",min:0,max:1,default:1},
                {type:"label",justify:"right",label:"Output",input:"none",output:"colormap"},
                {type:"refreshFunction",function:(nodeObject)=>{
                    const wrapperList = nodeObject.wrapperList;
                    const blendMode = wrapperList[1].data
                    const background = wrapperList[2].data
                    const foreground = wrapperList[3].data
                    const blend = wrapperList[5].data
                    if(background!=null&&foreground!=null){
                        const backgroundData = background.getImageData(0, 0, background.canvas.width, background.canvas.height);
                        const foregroundData = foreground.getImageData(0, 0, foreground.canvas.width, foreground.canvas.height);
                        const canvas = document.createElement("canvas");
                        canvas.width = background.canvas.width;
                        canvas.height = background.canvas.height;
                        const image2 = canvas.getContext("2d");
                        const data = backgroundData.data;
                        const data2 = foregroundData.data;
                        function clamp(value, min, max) {
                            return Math.max(min, Math.min(max, value));
                        }
                        
                        for (let i = 0; i < data.length; i += 4) {  
                            if(blendMode=="Normal"){     
                                data[i] = data[i]*(1-blend)+data2[i]*blend;
                                data[i + 1] = data[i+1]*(1-blend)+data2[i+1]*blend
                                data[i + 2] = data[i+2]*(1-blend)+data2[i+2]*blend
                            }else if(blendMode=="Add"){
                                data[i] = data[i]+data2[i]*blend;
                                data[i + 1] = data[i+1]+data2[i+1]*blend
                                data[i + 2] = data[i+2]+data2[i+2]*blend
                            }else if(blendMode=="Subtract"){
                                data[i] = data[i]-data2[i]*blend;
                                data[i + 1] = data[i+1]-data2[i+1]*blend
                                data[i + 2] = data[i+2]-data2[i+2]*blend
                            }else if(blendMode=="Multiply"){
                                data[i] = ((data[i]/255)*((data2[i]/255)*blend+(1-blend)))*255;   
                                data[i + 1] = ((data[i+1]/255)*((data2[i+1]/255)*blend+(1-blend)))*255;
                                data[i + 2] = ((data[i+2]/255)*((data2[i+2]/255)*blend+(1-blend)))*255;
                            }else if(blendMode=="Darker Color"){
                                data[i] = data[i]*(1-blend)+(data[i]<data2[i]?data[i]:data2[i])*blend;
                                data[i + 1] = data[i+1]*(1-blend)+(data[i+1]<data2[i+2]?data[i+1]:data2[i+1])*blend;
                                data[i + 2] = data[i+2]*(1-blend)+(data[i+2]<data2[i+2]?data[i+2]:data2[i+2])*blend;
                            }else if(blendMode=="Lighter Color"){
                                data[i] = data[i]*(1-blend)+(data[i]>data2[i]?data[i]:data2[i])*blend;
                                data[i + 1] = data[i+1]*(1-blend)+(data[i+1]>data2[i+2]?data[i+1]:data2[i+1])*blend;
                                data[i + 2] = data[i+2]*(1-blend)+(data[i+2]>data2[i+2]?data[i+2]:data2[i+2])*blend;
                            }
                        }
                        image2.putImageData(backgroundData, 0, 0);
                        nodeObject.wrapperList[0].updateValue(image2.canvas.toDataURL("image/png"))
                        nodeObject.wrapperList[6].updateValue(image2);
                    }
                }}
            ],
        ]
    },
    misc:{
        categoryName:"Misc",
        lookup:["output"],
        names:["Output"],
        values:[
            [
                {type:"label",justify:"left",label:"Height Map",input:"heightmap",output:"none"},
                {type:"label",justify:"left",label:"Color Map",input:"colormap",output:"none"},
                {type:"label",justify:"left",label:"Road Map",input:"roadmap",output:"none"},
                {type:"label",justify:"left",label:"Building Map",input:"buildingmap",output:"none"},
                {type:"slider",label:"Scale",control:"int",input:"none",width:"150px",output:"none",min:64,max:1024,default:256},
                {type:"slider",label:"Resolution",control:"int",input:"none",width:"150px",output:"none",min:64,max:1024,default:256},

                {type:"refreshFunction",function:(nodeObject)=>{
                    
                    const paramListElement = nodeObject.element.children[1];
                    const p1 = paramListElement.children[0].data
                    const p2 = paramListElement.children[1].data;
                    const p3 = paramListElement.children[2].data;
                    const p4 = paramListElement.children[3].data;
                    if(p1!=null&&p2!=null&&p3!=null&&p4!=null){
                        console.log("output")
                        createMesh(nodeObject.wrapperList[4].data,p1,p2,p3,p4)
                    }
                }}
            ],
        ]
    }
}


import { makeNoise2D } from "./openSimplexNoise.js";

function createNoise(width, height, scale, seed, octaves, persistence, lacunarity, threshold) {
    const ridged = threshold!=null;
    scale = scale || 1;
    seed = seed || Date.now();
    octaves = octaves || 1;
    persistence = persistence || 0;
    lacunarity = lacunarity || 2.0;

    const noise2D = makeNoise2D(seed);
    console.log("canvas")
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let amplitude = 1;
            let frequency = 1;
            let noiseValue = 0;

            for (let o = 0; o < octaves; o++) {
                noiseValue += amplitude * (noise2D(x * frequency / scale, y * frequency / scale));
                amplitude *= persistence;
                frequency *= lacunarity;
            }

            if(ridged){
                noiseValue=Math.abs(noiseValue-(threshold-0.5))*2-1
            }
            const value = (noiseValue + 1) * 128; // Normalize noise to [0, 255]
            const index = (y * width + x) * 4;
            data[index] = value;     // Red
            data[index + 1] = value; // Green
            data[index + 2] = value; // Blue
            data[index + 3] = 255;   // Alpha
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return ctx
}

function xoroshiro64p(a, b) {
    return function() {
        var r = a + b;
        b = b ^ a; a = b ^ (a << 26 | a >>> 6) ^ b << 9;
        b = b << 13 | b >>> 19;
        return (r >>> 0) / 4294967296;
    }
}

import { createMesh } from "./renderer.js";

// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


