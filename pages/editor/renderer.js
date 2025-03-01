let scene, camera, renderer, terrain, terrainMaterial, roadMesh;
let roadGroup = null;
let cityGroup = null;

export function createRenderer(element){
    // Load height map and color map textures
    const heightMapUrl = "./Untitled.png"; // Replace with your heightmap file path
    const colorMapUrl = "./Untitled.png"; // Replace with your color map file path
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 330, 500);
    camera.lookAt(0, -20, 0);


    // Create the renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    const bounds = element.getBoundingClientRect()
    renderer.setSize(bounds.width, bounds.height);
    element.appendChild(renderer.domElement);

    // Create terrain geometry
    const terrainWidth = 512;
    const terrainHeight = 512;
    const terrainSegments = 511;

    
    

    //createMesh(256,256,heightMapUrl,colorMapUrl)
    //renderer.setClearColor( 0xffbd25, 1 );	
    animate();
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 0).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    let rotation = 0
    function animate() {
        requestAnimationFrame(animate);
        if(terrain!=null){rotation += 0.001;
            camera.position.x = 500 * Math.sin(rotation);
            camera.position.z = 500 * Math.cos(rotation);
            camera.lookAt(0, 0, 0);
            //camera.rotation.y = rotation

            
        }
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        const bounds = element.getBoundingClientRect()
        renderer.setSize(bounds.width, bounds.height);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = bounds.width / bounds.height;
        camera.updateProjectionMatrix();
    });


    animate()
}

export function createMesh(scale, heightMapCTX, colorMapCTX, roadData, buildingData){
    const curvePoints =  [
        0, 0, 0,
        128, 20, 128,
        10, 0, 10,
        10, 0, 0,
        0,0,0,
    ];
    scene.remove(roadGroup);
    roadGroup = new THREE.Group();
    for(const a of roadData){
        //points, width
        createCurvedRoad(a,256);
    }
    scene.add( roadGroup );

    buildingData = [{height:10,width:5,x:128,y:0,z:128}]
    scene.remove(cityGroup);

    cityGroup = new THREE.Group();
    for(const a of buildingData){
        //points, width
        createBuilding(a,256);
    }
    scene.add( cityGroup );

    const terrainSegments = 255;
    const geometry = new THREE.PlaneGeometry(scale, scale, terrainSegments, terrainSegments);
    geometry.rotateX(-Math.PI / 2);

        const ctx = heightMapCTX
        const heightData = ctx.getImageData(0, 0, terrainSegments+1, terrainSegments+1).data;
        for(let i = 0; i < geometry.attributes.position.count; i++) {
            const x = i % (terrainSegments + 1);
            const z = Math.floor(i / (terrainSegments + 1));
            
            const height = heightData[Math.floor((x+((z)*(terrainSegments+1)))*4)] / 255;

            geometry.attributes.position.setY(i, (height * 40*(scale/200))-(scale/10))
        }

        geometry.computeVertexNormals(); // Recompute normals for proper lighting
        // After height map is loaded and terrain is updated, load color map and apply material
        const colorMap = new THREE.TextureLoader().load(colorMapCTX.canvas.toDataURL(), () => {
            terrainMaterial = new THREE.MeshPhongMaterial({
                map: colorMap,
                side: THREE.DoubleSide,
                flatShading: true,
                shininess: 0,
            });

            // Create the terrain mesh
            scene.remove(terrain)
            terrain = new THREE.Mesh(geometry, terrainMaterial);
            scene.add(terrain)     
        });
    //});
}


export function createBuilding(data,size,texture){
    const xPos = data.x||0
    const yPos = data.y||0
    const zPos = data.z||0
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb('+Math.random()*255+',0,0)';
    ctx.fillRect(0, 0, 256, 256);

    const materials = [null,null,null,null,null,null];

    ctx.fillStyle = 'rgb('+Math.random()*255+',0,0)';
    ctx.fillRect(0, 0, 256, 256);
    materials[0] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(ctx.canvas.toDataURL()) });
    materials[1] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(ctx.canvas.toDataURL()) });
    materials[2] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(ctx.canvas.toDataURL()) });
    materials[3] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(ctx.canvas.toDataURL()) });
    materials[4] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(ctx.canvas.toDataURL()) });
    materials[5] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(ctx.canvas.toDataURL()) });

    
    
    
    const colorMap = new THREE.TextureLoader().load(ctx.canvas.toDataURL(), () => {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const building = new THREE.Mesh(geometry, materials);
        //const material = new THREE.MeshPhongMaterial( { map: colorMap } );
        building.position.set(xPos-size/2, data.height/2, zPos-size/2);
        building.scale.set(data.width, data.height, data.width);
        cityGroup.add( building );
    });

}


export function createCurvedRoad(data,size){
    const curvePoints = data.points||[0,0,0,255,0,255]
    const roadWidth = data.width||10
    const pointCount = data.pointCount||1
    const pts = [];
    //console.log(curvePoints)
    for ( let i = 0; i < curvePoints.length; i += 3 ) {
        
        pts.push( new THREE.Vector3( curvePoints[ i ]-size/2, curvePoints[ i + 1 ], curvePoints[ i + 2 ]-size/2 ) );
        
    }

    const ls = pointCount-1; // length segments
    const ws = 5; // width segments 
    const lss = ls + 1;
    const wss = ws + 1;

    const curve = new THREE.CatmullRomCurve3( pts,false,'catmullrom',0.5 );
    const points = curve.getPoints( ls );
    const len = curve.getLength( );
    const lenList = curve.getLengths ( ls );

    const faceCount = ls * ws * 2;
    const vertexCount = lss * wss;

    const indices = new Uint32Array( faceCount * 3 );
    const vertices = new Float32Array( vertexCount * 3 );
    const uvs = new Float32Array( vertexCount * 2 );

    const g = new THREE.BufferGeometry( );
    g.setIndex( new THREE.BufferAttribute( indices, 1 ) );	
    g.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    g.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

    let idxCount = 0;
    let a, b1, c1, c2;

    for ( let j = 0; j < ls; j ++ ) {
        
        for ( let i = 0; i < ws; i ++ ) {
            
            // 2 faces / segment,  3 vertex indices
            a =  wss * j + i;
            b1 = wss * ( j + 1 ) + i;		// right-bottom
            c1 = wss * ( j + 1 ) + 1 + i;
        //  b2 = c1							// left-top
            c2 = wss * j + 1 + i;
            
            indices[ idxCount     ] = a; // right-bottom
            indices[ idxCount + 1 ] = b1;
            indices[ idxCount + 2 ] = c1; 
            
            indices[ idxCount + 3 ] = a; // left-top
            indices[ idxCount + 4 ] = c1 // = b2,
            indices[ idxCount + 5 ] = c2; 
            
            g.addGroup( idxCount, 6, i ); // write group for multi material
            
            idxCount += 6;
            
        }
            
    }

    let uvIdxCount = 0;

    for ( let j = 0; j < lss ; j ++ ) {

        for ( let i = 0; i < wss; i ++ ) {

            uvs[ uvIdxCount     ] = lenList[ j ] / len;
            uvs[ uvIdxCount + 1 ] = i / ws;
            
            uvIdxCount += 2;
            
        }
        
    }

    let x, y, z;
    let posIdx = 0; // position index

    let tangent;
    const normal = new THREE.Vector3( );
    const binormal = new THREE.Vector3( 0, 1, 0 );
    
    const t = []; // tangents
    const n = []; // normals
    const b = []; // binormals

    for ( let j = 0; j < lss; j ++ ) {

        // to the points
        
        tangent = curve.getTangent(  j / ls );
        t.push( tangent.clone( ) );
        
        normal.crossVectors( tangent, binormal );
        
        normal.y = 0; // to prevent lateral slope of the road
        
        normal.normalize( );
        n.push( normal.clone( ) );
        
        binormal.crossVectors( normal, tangent ); // new binormal
        b.push( binormal.clone( ) );	
        
    }

    const dw = [ -0.36, -0.34, -0.01, 0.01, 0.34, 0.36 ]; // width from the center line

    const multi = 20;
    for ( let j = 0; j < lss; j ++ ) {  // length
            
        for ( let i = 0; i < wss; i ++ ) { // width
        
            x = points[ j ].x + dw[ i ]*roadWidth * n[ j ].x;
            y = points[ j ].y;
            z = points[ j ].z + dw[ i ]*roadWidth * n[ j ].z;		 
            
            vertices[ posIdx ] = x;
            vertices[ posIdx + 1 ] = y;
            vertices[ posIdx + 2 ] = z;
            
            posIdx += 3;
            
        }
        
    }
    const material = [
        
        new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide  } ),
        new THREE.MeshBasicMaterial( { color: 0x333333, side: THREE.DoubleSide  } ),
        new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide  } ),
        new THREE.MeshBasicMaterial( { color: 0x333333, side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide} ),
        
    ];

    roadMesh = new THREE.Mesh( g, material );
    roadGroup.add( roadMesh );

}

