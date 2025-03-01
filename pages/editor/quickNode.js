let imageScale = 256

import { paramReference } from "./nodeData.js";


import { createRenderer } from "./renderer.js";
import { createMesh } from "./renderer.js";
modifyElements(".output",(element)=>{
    createRenderer(element)
})

let mouseX = 0
let mouseY = 0
window.addEventListener("mousemove",(e)=>{
    mouseX = e.clientX
    mouseY = e.clientY
});

function pauseEvent(e){
    e.preventDefault()
    e.stopPropagation()
    e.cancelBubble = true
    e.returnValue = false
}
window.ondragstart=pauseEvent


modifyElements(".nodeRenderer",(element)=>{
    const bounds = element.parentElement.getBoundingClientRect()
    var scene = new Scene(bounds.width,bounds.height,element);
    element.scene = scene;
    element.style="display:block;position:relative;user-select:none;"
    window.addEventListener("resize",(e)=>{
        resize()
    })
    function resize(){
            const bounds = element.parentElement.getBoundingClientRect()
            scene.width = bounds.width
            scene.height = bounds.height;
            element.style.width=bounds.width
            element.style.height=bounds.height
            repositionScene(element);
    }
    resize()
    
    
    for(const a of element.children){
        initializeNode(a,scene)
    }
    
    handleKeyPresses(element)
    addCanvasDragListeners(element);
    addCanvasZoomListeners(element);
    repositionScene(element);
    scene.createConnections();
});

var scale = 1
const dropShadow = "box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.1);"
const dropShadowDark = "1px 1px 20px 4px rgba(0, 0, 0, 0.5)";
const dropShadowSelected = "1px 1px 10px 0px rgba(30, 30, 30, 0.2)"

const insetShadow = "inset 2px 2px 4px rgba(0, 0, 0, 1), inset -2px -2px 4px rgba(255, 255, 255, 0.5)"
const border = "border: "+1+"px solid rgba(255,255,255,0);"
function initializeNode(element,scene){
    const style = document.createElement("style");
    document.head.appendChild(style);
    const x = parseFloat(element.getAttribute("x"))||0
    const y = parseFloat(element.getAttribute("y"))||0
    const nodeObject = new Node(x,y,scene,element);
    element.nodeObject = nodeObject;
    element.style = "transition:box-shadow 0.02s ease, border-color 0.02s ease;background:rgba(60,60,60,1);display:flex;position:absolute;height:fit-content;flex-direction:column;width:fit-content;font-family:Arial;border-radius:9px;overflow:visible;box-shadow:"+dropShadowDark+""
    const header = document.createElement("div");
    const params = document.createElement("div");
    const label = document.createElement("span");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style="cursor:pointer;height: 20px; width: auto; aspect-ratio:1;transition: transform 0.3s ease-out; transform-origin: 50% 47%;"
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    const path = document.createElementNS("http://www.w3.org/2000/svg","path")
    path.setAttribute("d","M 5 6 L 10 15 L 15 6")
    path.setAttribute("stroke","black")
    path.setAttribute("stroke-width","0")
    path.setAttribute("fill","white")

    const connections = JSON.parse(element.getAttribute("connections"))
    if(connections!=null){
        for(const a of connections){
            a.parentNode = nodeObject;
            scene.connections.push(a);
        }
    }
    
    svg.appendChild(path)
    //document.body.appendChild(svg);
    header.style = "border-top-left-radius:7px;border-top-right-radius:7px;align-items:center;padding:5px;display:flex;cursor:grab;width:100%;height:25px;flex-shrink:0;gap:1px;";
    params.style = "user-select:none;width:100%;height:100%;flex-direction:column;flex-wrap:wrap;display:flex;padding:5px;gap:6px"
    

    header.appendChild(svg);
    header.appendChild(label);
    element.appendChild(header);
    element.appendChild(params);
    element.setAttribute("open","true");

    addParentDragListeners(header)
    
    label.textContent = element.getAttribute("name")
    label.style="user-select:none;color:white;font-family: 'Verdana';font-weight:600;font-size:12px"
    const nodeID = element.getAttribute("node-id");
    let index = -1
    if(nodeID!=null){
        const nodeType = element.getAttribute("node-type")
        if(nodeType=="noise"){
            header.style.backgroundColor="rgb(204, 0, 0)";
            index=paramReference.noise.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.noise.values[index],element);}
        }else if(nodeType=="misc"){
            header.style.backgroundColor="rgb(174, 150, 0)";
            index=paramReference.misc.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.misc.values[index],element);}
        }else if(nodeType=="convert"){
            header.style.backgroundColor="rgb(104, 170, 0)";
            index=paramReference.convert.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.convert.values[index],element);}
        }else if(nodeType=="modifiers"){
            header.style.backgroundColor="rgb(0, 160, 120)";
            index=paramReference.modifiers.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.modifiers.values[index],element);}
        }else if(nodeType=="flow"){
            header.style.backgroundColor="rgb(50, 100, 190)";
            index=paramReference.flow.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.flow.values[index],element);}
        }else if(nodeType=="maps"){
            header.style.backgroundColor="rgb(220, 123, 5)";
            index=paramReference.maps.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.maps.values[index],element);}
        }else if(nodeType=="roads"){
            header.style.backgroundColor="rgb(123, 123, 225)";
            index=paramReference.roads.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.roads.values[index],element);}
        }else if(nodeType=="buildings"){
            header.style.backgroundColor="rgb(123, 123, 225)";
            index=paramReference.buildings.lookup.indexOf(nodeID);
            if(index!=-1){addParamsToNode(paramReference.buildings.values[index],element);}
        }
    }
    repositionNode(element)
}

function addParamsToNode(params,element2){
    const scene = element2.nodeObject.parentScene;
    const paramListElement=element2.children[1];
    
    let updateMethods = []
    let ready=false
    let modified = true
    //console.log(paramListElement)
    for(const a of params){
        if(a.type=="label"){
            const wrapper = document.createElement("div")
            wrapper.data = null;
            wrapper.refreshFunction=a.refreshFunction
            const label = document.createElement("span")
            wrapper.style="padding:3px;display:flex;gap:0px;align-items:center"
            wrapper.style.width=a.width||"150px";wrapper.style.height="fit-content";
            label.textContent = a.label;
            if(a.justify=="right"){
                wrapper.style.justifyContent="right";
            }else if(a.justify=="center"){
                wrapper.style.justifyContent="center";
            }else if(a.justify=="left"){
                wrapper.style.justifyContent="left";
            }
            label.style="color:white;font-family: 'Verdana';font-weight:700;font-size:10px;pointer-events:none;user-select:none;"
            wrapper.appendChild(label);
            paramListElement.appendChild(wrapper);
            
            function updateValue(e){
                wrapper.data = e;
                modified = true
                if(outputPoint!=null){
                    outputPoint.setOutputValue(e)
                }
                if(wrapper.refreshFunction!=null){wrapper.refreshFunction(wrapper)}
            }
            wrapper.setControlled=()=>{wrapper.controlled = true}
            wrapper.setNormal=()=>{wrapper.controlled = false}
            wrapper.updateValue = updateValue
            const inputPoint = addConnectorPoint("input",a.input,wrapper);
            if(inputPoint!=null){wrapper.inputPoint=inputPoint;element2.nodeObject.inputPoints.push(inputPoint)}
            const outputPoint = addConnectorPoint("output",a.output,wrapper);
            if(outputPoint!=null){wrapper.outputPoint=outputPoint;element2.nodeObject.outputPoints.push(outputPoint)}
        }else if(a.type=="display"){
            const wrapper = document.createElement("div")
            wrapper.data = null;
            wrapper.refreshFunction=a.refreshFunction
            element2.nodeObject.parameters.push(()=>{return wrapper.data})
            wrapper.type = "display"
            wrapper.style="padding:3px;display:flex;gap:0px;align-items:center;background-color:black;border-radius:5px;"
            wrapper.style.width="150px";wrapper.style.height="150px";
            paramListElement.appendChild(wrapper);
            function updateDisplay(e){
                const scale = paramListElement.children[2].value;
                const seed = paramListElement.children[3].value;
                const octaves = paramListElement.children[4].value;
                const persistence = paramListElement.children[5].value;
                const lacunarity = paramListElement.children[6].value;
                const imageURL = createNoise(imageScale,imageScale,scale,seed,octaves,persistence,lacunarity)
                //createMesh(256,256,imageURL,imageURL);
                wrapper.style.backgroundImage = "url("+imageURL+")";
                wrapper.style.backgroundSize = "100% 100%";
            }
            //updateMethods.push(updateDisplay)
            function updateValue(e){
                const imageURL = e
                wrapper.style.backgroundImage = "url("+imageURL+")";
                wrapper.style.backgroundSize = "100% 100%";
                wrapper.data = e;
                if(wrapper.outputPoint!=null){
                    wrapper.outputPoint.setOutputValue(e)
                }
                if(wrapper.refreshFunction!=null){wrapper.refreshFunction(wrapper)}
            }
            wrapper.updateValue = updateValue
            wrapper.setControlled=()=>{wrapper.controlled = true}
            wrapper.setNormal=()=>{wrapper.controlled = false}
            const inputPoint = addConnectorPoint("input",a.input,wrapper);
            if(inputPoint!=null){wrapper.inputPoint=inputPoint;element2.nodeObject.inputPoints.push(inputPoint)}
            const outputPoint = addConnectorPoint("output",a.output,wrapper);
            if(outputPoint!=null){wrapper.outputPoint=outputPoint;element2.nodeObject.outputPoints.push(outputPoint)}
        }else if(a.type=="slider"){
            const wrapper = document.createElement("div")
            wrapper.data = null;
            wrapper.refreshFunction=a.refreshFunction
            element2.nodeObject.parameters.push(()=>{return wrapper.data})
            wrapper.controlled = false
            element2.nodeObject.parameters.push(()=>{return wrapper.value})
            const outerSlider = document.createElement("div")
            const label = document.createElement("span")
            const value = document.createElement("span")
            wrapper.style="flex-shrink:0;cursor:ew-resize;padding:0px;display:flex;gap:0px;align-items:center;border-radius:5px;background-color:black;"
            wrapper.style.width=a.width||"150px";wrapper.style.height="fit-content";
            outerSlider.style = "padding:5px;display:flex;width:100%;height:25px;background-color:rgb(0, 102, 180);align-items:center;justify-content:space-between;"
            label.style="color:white;font-family: 'Verdana';font-weight:700;font-size:10px;pointer-events:none;user-select:none;"
            value.style="color:white;font-family: 'Verdana';font-weight:700;font-size:10px;user-select:none;"
            value.contentEditable = true
            let prevText = "0"
            
            label.textContent = "label";
            outerSlider.style.background = "linear-gradient(0deg, rgba(0, 102, 180, 1) 0%, rgba(0, 102, 180, 1) 100%, rgba(0, 102, 180, 1) 101%)";
            label.textContent = a.label;
            wrapper.value = 0;
            wrapper.setControlled=()=>{
                outerSlider.onmousedown = null;
                wrapper.controlled = true
                wrapper.style.cursor = "default"
                outerSlider.style.filter = "grayscale(100%) contrast(90%)";
            }
            wrapper.setNormal=()=>{
                outerSlider.onmousedown = mouseHandler
                wrapper.controlled = false
                wrapper.style.cursor = "ew-resize"
                outerSlider.style.filter = "none";
                outerSlider.style.background = "linear-gradient(0deg, rgba(0, 102, 180, 1) 0%, rgba(0, 102, 180, 1) 100%, rgba(0, 102, 180, 1) 101%)";
            }
            function updateValue(e){
                wrapper.value = e;
                prevText = e
                wrapper.data = wrapper.value;
                value.textContent = e;
                const width = wrapper.getBoundingClientRect().width;
                const ratio = (e-a.min)/(a.max-a.min);
                outerSlider.style.background = "linear-gradient(90deg, rgba(0, 102, 180, 1) 0%, rgba(0, 102, 180, 1) "+100*ratio+"%, rgba(40, 40, 40, 1) "+100*ratio+"%)";
                modified = true
                if(wrapper.outputPoint!=null){
                    wrapper.outputPoint.setOutputValue(e)
                }
                if(wrapper.refreshFunction!=null){wrapper.refreshFunction(wrapper)}
            }
            wrapper.updateValue = updateValue
            value.onblur = handleTextBox
            //value.addEventListener("blur",handleTextBox)
            value.onclick = (e)=>{
                e.stopPropagation()
            }
            value.onfocus = (e)=>{
                document.onclick = (e)=>{
                    handleTextBox()
                    value.blur()
                }
            }
            value.onkeydown = (e)=>{
                if(e.key=="Enter"){
                    value.blur()
                }
            }
            function handleTextBox(e){
                if(!isNaN(parseFloat(value.textContent))){
                    updateValue(parseFloat(value.textContent))
                }else{
                    updateValue(parseFloat(prevText))
                }
            }
            let dragging = false,x0 = 0,v0 = 0;
            
            function mouseHandler(e){
                x0 = e.clientX;
                v0 = wrapper.value;
                dragging = true;
                e.stopPropagation();
                const bounds = outerSlider.getBoundingClientRect();
                const ratio = (e.clientX-x0)/bounds.width;
                document.onmousemove = handleMouseMove;
                document.onmouseleave = handleMouseLeave;
                document.onmouseup = handleMouseUp;
            }
            outerSlider.onmousedown = mouseHandler
            function handleMouseLeave(e){
                dragging = false;   
            }
            function handleMouseUp(e){
                dragging = false;
            }
            function handleMouseMove(e){
                if(dragging){
                    e.stopPropagation();
                    if(e.buttons==1){
                        const bounds = outerSlider.getBoundingClientRect();
                        const ratio = (e.clientX-x0)/bounds.width;
                        if(a.input=="float"||a.control=="float"){
                            let value = Math.round((v0+ratio*(a.max-a.min))*1000)/1000;
                            value = value>=a.max?a.max:value<=a.min?a.min:value;
                            updateValue(value);
                        }else if(a.input=="int"||a.control=="int"){
                            let value = Math.round((v0+ratio*(a.max-a.min)));
                            value = value>=a.max?a.max:value<=a.min?a.min:value;
                            updateValue(value);
                        }
                    }
                }
            }
            wrapper.appendChild(outerSlider);
            outerSlider.appendChild(label);
            outerSlider.appendChild(value);
            paramListElement.appendChild(wrapper);
            updateValue(a.default);
            const inputPoint = addConnectorPoint("input",a.input,wrapper);
            if(inputPoint!=null){wrapper.inputPoint=inputPoint;element2.nodeObject.inputPoints.push(inputPoint)}
            const outputPoint = addConnectorPoint("output",a.output,wrapper);
            if(outputPoint!=null){wrapper.outputPoint=outputPoint;element2.nodeObject.outputPoints.push(outputPoint)}
        }else if(a.type=="ramp"){
            const wrapper = document.createElement("div")
            console.log("canvas")
            const canvas = document.createElement("canvas")
            const controls = document.createElement("div")
            const plusSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            plusSvg.style="height: 20px; width: auto; aspect-ratio:1;transition: transform 0.3s ease-out; transform-origin: 50% 47%;"
            plusSvg.setAttribute('width', '20');plusSvg.setAttribute('height', '20');plusSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            const plusPath = document.createElementNS("http://www.w3.org/2000/svg","path");
            plusPath.setAttribute("stroke","rgba(255,255,255,1)");plusPath.setAttribute("stroke-width","2");plusPath.setAttribute("d","M 3 10 L 17 10 L 10 10 L 10 3 L 10 17 L 10 10");
            const minusSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            minusSvg.style="height: 20px; width: auto; aspect-ratio:1;transition: transform 0.3s ease-out; transform-origin: 50% 47%;"
            minusSvg.setAttribute('width', '20');minusSvg.setAttribute('height', '20');minusSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            const minusPath = document.createElementNS("http://www.w3.org/2000/svg","path");
            minusPath.setAttribute("stroke","rgba(255,255,255,1)");minusPath.setAttribute("stroke-width","2");minusPath.setAttribute("d","M 3 10 L 17 10");
            const easeDropdown = createDropdown({options:["Linear","Ease","Closest","Average"],callback:(e)=>{wrapper.refreshCanvas()}})
            //colorDropdown.style.marginTop = "-2px"
            easeDropdown.style.marginLeft = "auto"
            easeDropdown.style.marginTop = "-2px"

            plusSvg.appendChild(plusPath)
            controls.appendChild(plusSvg)
            minusSvg.appendChild(minusPath);
            controls.appendChild(minusSvg)
            //controls.appendChild(colorDropdown);
            controls.appendChild(easeDropdown);
            wrapper.appendChild(controls);
            wrapper.appendChild(canvas);
            paramListElement.appendChild(wrapper);

            wrapper.style="overflow:visible;padding:3px;display:flex;gap:0px;align-items:center;flex-wrap:wrap;"
            wrapper.style.width=a.width||"150px";wrapper.style.height="fit-content";
            canvas.style="border:1px solid black;border-radius:2px;height:20px;width:100%;cursor:pointer;user-select:none;"
            controls.style="overflow:visible;width:"+(a.width||"150px")+";height:34px;display:flex;gap:0px;align-items:center;gap:7px;padding-left:5px"

            let colorPoints = []
            wrapper.selectedPoint = null;
            colorPoints.push(new ColorPoint(0,[0,0,0,255],true,wrapper))
            colorPoints.push(new ColorPoint(1,[255,255,255,255],true,wrapper))
            
            wrapper.selectedPoint = colorPoints[0]

            const ctx = canvas.getContext("2d");
            canvas.width = 256;
            canvas.height = 1;
            
            function updateValue(e){
                wrapper.data = e;
                modified = true
                if(outputPoint!=null){
                    outputPoint.setOutputValue(e)
                }
                if(wrapper.refreshFunction!=null){wrapper.refreshFunction(wrapper)}
            }
            wrapper.updateValue = updateValue
            
            wrapper.refreshCanvas=()=>{
                const colorLookup = new Uint8Array(256*4);
                for(let i = 0; i<256;i++){
                    //const r = Math.round(Math.sin(i/256*2*Math.PI)*127+128);
                    //const g = Math.round(Math.sin(i/256*2*Math.PI+Math.PI/3)*127+128);
                    //const b = Math.round(Math.sin(i/256*2*Math.PI+Math.PI/3*2)*127+128);
                    let closestAbove = null
                    let closestDiffAbove = 1
                    for(const a of colorPoints){
                        if(a.position>=i/256){
                            const diff = a.position-i/256
                            if(diff<closestDiffAbove){
                                closestDiffAbove = diff
                                closestAbove = a
                            }
                        }
                    }
                    let closestBelow = null
                    let closestDiffBelow = 1
                    for(const a of colorPoints){
                            if(a.position<=i/256){
                                const diff = i/256-a.position
                                
                                if(diff<closestDiffBelow){
                                    closestDiffBelow = diff
                                    closestBelow = a
                                }
                            }
                    }
                    if(closestBelow==closestAbove){
                        //closestBelow=colorPoints[1]
                        //closestDiffBelow=i/256-closestBelow.position
                    }
                    

                    let r = 0,g = 0,b = 0;

                    if(easeDropdown.value=="Linear"){
                        
                        r = Math.round(closestAbove.color[0]*(i/255-closestBelow.position)/(closestAbove.position-closestBelow.position)+closestBelow.color[0]*(closestAbove.position-i/255)/(closestAbove.position-closestBelow.position));
                        g = Math.round(closestAbove.color[1]*(i/255-closestBelow.position)/(closestAbove.position-closestBelow.position)+closestBelow.color[1]*(closestAbove.position-i/255)/(closestAbove.position-closestBelow.position));
                        b = Math.round(closestAbove.color[2]*(i/255-closestBelow.position)/(closestAbove.position-closestBelow.position)+closestBelow.color[2]*(closestAbove.position-i/255)/(closestAbove.position-closestBelow.position));
                        if(closestBelow==closestAbove){r=closestAbove.color[0];g=closestAbove.color[1];b=closestAbove.color[2]}
                    }else if(easeDropdown.value=="Ease"){
                        function ease(t) {
                            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                        }
                        r = Math.round(closestBelow.color[0] + (closestAbove.color[0] - closestBelow.color[0]) * ease((i / 255 - closestBelow.position) / (closestAbove.position - closestBelow.position)));
                        g = Math.round(closestBelow.color[1] + (closestAbove.color[1] - closestBelow.color[1]) * ease((i / 255 - closestBelow.position) / (closestAbove.position - closestBelow.position)));
                        b = Math.round(closestBelow.color[2] + (closestAbove.color[2] - closestBelow.color[2]) * ease((i / 255 - closestBelow.position) / (closestAbove.position - closestBelow.position)));
                        if(closestBelow==closestAbove){r=closestAbove.color[0];g=closestAbove.color[1];b=closestAbove.color[2]}
                    }else if(easeDropdown.value=="Closest"){
                        if(closestDiffAbove<closestDiffBelow){
                            r = Math.round(closestAbove.color[0]);
                            g = Math.round(closestAbove.color[1]);
                            b = Math.round(closestAbove.color[2]);
                        }else{
                            r = Math.round(closestBelow.color[0]);
                            g = Math.round(closestBelow.color[1]);
                            b = Math.round(closestBelow.color[2]);
                        }
                        if(closestBelow==closestAbove){r=closestAbove.color[0];g=closestAbove.color[1];b=closestAbove.color[2]}
                    }else if(easeDropdown.value=="Average"){
                        let totalDiff = 0;
                        for(const a of colorPoints){
                            const diff = 1-Math.abs(a.position-i/256)
                            totalDiff += diff

                        }
                        for(const a of colorPoints){
                            const diff = (1-Math.abs(a.position-i/256))/totalDiff
                            r += a.color[0]*diff
                            g += a.color[1]*diff
                            b += a.color[2]*diff

                        }

                    }
                    r=r>=255?255:r<=0?0:r;
                    g=g>=255?255:g<=0?0:g;
                    b=b>=255?255:b<=0?0:b;

                    colorLookup[i*4] = r;
                    colorLookup[i*4+1] = g;
                    colorLookup[i*4+2] = b;
                    colorLookup[i*4+3] = 255;
                }
                const imageData = ctx.createImageData(256, 1);
                for(let i = 0; i<256;i++){
                    imageData.data[i*4] = colorLookup[i*4];
                    imageData.data[i*4+1] = colorLookup[i*4+1];
                    imageData.data[i*4+2] = colorLookup[i*4+2];
                    imageData.data[i*4+3] = colorLookup[i*4+3];
                }
                ctx.putImageData(imageData, 0, 0);
                updateValue(colorLookup)
            }

            wrapper.data = null;
            wrapper.refreshFunction=a.refreshFunction
            
            plusSvg.onclick = ()=>{
                let newPoint = null
                if(wrapper.parentElement.children[4].grayscale){
                    const random = Math.round(Math.random()*20)
                    newPoint = new ColorPoint(0.5,[100+random,100+random,100+random,255],false,wrapper)
                }else{
                    newPoint = new ColorPoint(0.5,[100,200,100,255],false,wrapper)
                }
                colorPoints.push(newPoint)
                wrapper.selectedPoint = newPoint
                newPoint.quietSelect()
                wrapper.refreshCanvas()
            }
            minusSvg.onclick = ()=>{
                if(colorPoints.length>2&&wrapper.selectedPoint!=null&&wrapper.selectedPoint.base==false){
                    const index = colorPoints.indexOf(wrapper.selectedPoint)
                    wrapper.selectedPoint.delete()
                    colorPoints.splice(index,1)
                    colorPoints[0].select()
                    colorPoints[0].deselect()

                    wrapper.refreshCanvas()
                }
            }

            wrapper.setControlled=()=>{wrapper.controlled = true}
            wrapper.setNormal=()=>{wrapper.controlled = false}
            
            const inputPoint = addConnectorPoint("input",a.input,wrapper);
            if(inputPoint!=null){wrapper.inputPoint=inputPoint;element2.nodeObject.inputPoints.push(inputPoint)}
            const outputPoint = addConnectorPoint("output",a.output,wrapper);
            if(outputPoint!=null){wrapper.outputPoint=outputPoint;element2.nodeObject.outputPoints.push(outputPoint)}

            wrapper.refreshCanvas()
        }else if(a.type=="color"){
            const wrapper = document.createElement("div")
            wrapper.data = null;
            
            wrapper.grayscale = a.grayscale==null?false:a.grayscale
            wrapper.refreshFunction=a.refreshFunction
            console.log(a)
            wrapper.style="border-radius:5px;padding:3px;display:flex;gap:0px;align-items:center"
            wrapper.style.width=a.width||"150px";wrapper.style.height="25px"
            paramListElement.appendChild(wrapper);   
            wrapper.style.backgroundColor = wrapper.data==null?"rgba(0,0,0,1)":wrapper.data;         
            function updateValue(e){
                wrapper.data = e;
                modified = true
                wrapper.style.backgroundColor = wrapper.data==null?"rgba(0,0,0,1)":"rgba(+"+wrapper.data[0]+", "+wrapper.data[1]+", "+wrapper.data[2]+", 1)";
                if(outputPoint!=null){
                    outputPoint.setOutputValue(e)
                }
                if(wrapper.refreshFunction!=null){wrapper.refreshFunction(wrapper)}
            }
            
            wrapper.setControlled=()=>{wrapper.controlled = true}
            wrapper.setNormal=()=>{wrapper.controlled = false}
            wrapper.updateValue = updateValue
            const inputPoint = addConnectorPoint("input",a.input,wrapper);
            if(inputPoint!=null){wrapper.inputPoint=inputPoint;element2.nodeObject.inputPoints.push(inputPoint)}
            const outputPoint = addConnectorPoint("output",a.output,wrapper);
            if(outputPoint!=null){wrapper.outputPoint=outputPoint;element2.nodeObject.outputPoints.push(outputPoint)}
        }else if(a.type=="dropdown"){
            const wrapper = document.createElement("div")
            wrapper.data = a.default||null;
            wrapper.options = a.options
            wrapper.refreshFunction=a.refreshFunction
            const dropdown = createDropdown({openHeight:"100px",width:"100%",options:wrapper.options,callback:(e)=>{wrapper.updateValue(dropdown.value)
                }})
            wrapper.appendChild(dropdown)
            wrapper.style="display:flex;gap:0px;align-items:center;overflow:visible;"
            wrapper.style.width=a.width||"150px";wrapper.style.height="25px";
            paramListElement.appendChild(wrapper);   
            function updateValue(e){
                wrapper.data = e;
                modified = true
                if(outputPoint!=null){
                    outputPoint.setOutputValue(e)
                }
                if(wrapper.refreshFunction!=null){wrapper.refreshFunction(wrapper)}
            }
            
            wrapper.setControlled=()=>{wrapper.controlled = true}
            wrapper.setNormal=()=>{wrapper.controlled = false}
            wrapper.updateValue = updateValue
            const inputPoint = addConnectorPoint("input",a.input,wrapper);
            if(inputPoint!=null){wrapper.inputPoint=inputPoint;element2.nodeObject.inputPoints.push(inputPoint)}
            const outputPoint = addConnectorPoint("output",a.output,wrapper);
            if(outputPoint!=null){wrapper.outputPoint=outputPoint;element2.nodeObject.outputPoints.push(outputPoint)}
        }else if(a.type=="refreshFunction"){
            updateMethods.push(a.function);
        }
    }
    element2.nodeObject.fillWrapperList()
    ready = true;
    function updateAll(){
        if(ready){
            for(const a of updateMethods){
                a(element2.nodeObject)
            }
            for(const b of element2.nodeObject.inputPoints){
                if(b.connected){
                    console.log(b)
                    //b.element.updateValue(b.getUpstream())
                }
            }
            for(const c of element2.nodeObject.outputPoints){
                if(c.connectedTo){
                    c.data = c.element.data
                }
            }
        }
    }
    element2.updateAll=updateAll
    setInterval(()=>{
        if(modified){
            updateAll();
            modified = false;
        }
    },50)

    const width = window.getComputedStyle(element2.children[1]).getPropertyValue("width");
    element2.children[1].style.minWidth = width;
    element2.children[1].style.maxWidth = width;
    
    element2.children[1].style.flexDirection = "row"
    
}


let dragging = false
let snapElement = null
let currentElement = null;
function addConnectorPoint(type,input,element){
    if(input=="none"){return null}
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style="height: 20px; width: auto; aspect-ratio:1;transition: transform 0.3s ease-out; transform-origin: 50% 47%;"
    svg.setAttribute('width', '15');
    svg.setAttribute('height', '20');

    
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    const path = document.createElementNS("http://www.w3.org/2000/svg","path")
    
    path.setAttribute("stroke","rgba(0,0,0,0)")
    path.setAttribute("stroke-width","0")
    path.setAttribute("d","M 6 5 L 15 10 L 6 15")
    path.setAttribute("d","M 2.5 10 L 7.5 5 L 12.5 10 L 7.5 15")

    let color = "rgba(0,0,0,1)";
    if(input=="float"){
        color = "rgba(255,255,255,1)"
    }else if(input=="int"){
        color = "rgba(250,0,190,1)"
    }else if(input=="heightmap"){
        color = "rgba(0,235,0,1)"
    }else if(input=="colormap"){
        color = "rgba(0,235,200,1)"
    }else if(input=="roadmap"){
        color = "rgb(147, 147, 255)"
    }else if(input=="buildingmap"){
        color = "rgba(255,235,0,1)"
    }else if(input=="buildingset"){
        color = "rgb(96, 154, 255)"
    }

    path.setAttribute("fill",color)

    svg.style="position:absolute;z-index:100;cursor:pointer;"
    //add a drop shadow
    svg.style.filter = "drop-shadow(0px 0px 2px rgba(0,0,0,0.5))";

    svg.appendChild(path)
    element.appendChild(svg);
    //element.parentElement.parentElement.nodeObject
    const bounds = window.getComputedStyle(element).getPropertyValue("width");
    if(type=="input"){
        svg.style.left = "-9px"
    }else{
        svg.style.left = (parseInt(bounds)+4)+"px";
    }

    
    let interval = null
    let moved = false;
    
    svg.onmousedown = (e)=>{
        moved = false
        const parent = element.parentElement.parentElement
        const selfBounds = svg.getBoundingClientRect()
        const parentBounds = parent.getBoundingClientRect()
        const sceneBounds = parent.parentElement.getBoundingClientRect()
        const scene = parent.nodeObject.parentScene
        const relX = ((selfBounds.x+selfBounds.width/2) - parentBounds.x)/scene.scale
        const relY = ((selfBounds.y+selfBounds.height/2) - parentBounds.y)/scene.scale
        e.stopPropagation()
        dragging = true
        console.log(parent.nodeObject)
        const line = new Connector(0,0,0,0,parent.nodeObject.parentScene,color,type)
        const x0 = e.clientX
        const y0 = e.clientY
        let e2 = null
        currentElement = svg

        interval = setInterval(()=>{
            if(moved){
                dragging = true
                const x1 = relX+parent.nodeObject.px
                const y1 = relY+parent.nodeObject.py
                var x2 = e2.clientX-sceneBounds.x;
                var y2 = e2.clientY-sceneBounds.y
                if(snapElement!=null){
                    const selfBounds2 = snapElement.getBoundingClientRect()
                    const parentBounds2 = snapElement.parentElement.parentElement.parentElement.getBoundingClientRect()
                    const relX = ((selfBounds2.x+selfBounds2.width/2) - parentBounds2.x)/scene.scale
                    const relY = ((selfBounds2.y+selfBounds2.height/2) - parentBounds2.y)/scene.scale
                    x2 = (relX+snapElement.parentElement.parentElement.parentElement.nodeObject.px+scene.x)*scene.scale;
                    y2 = (relY+snapElement.parentElement.parentElement.parentElement.nodeObject.py+scene.y)*scene.scale;
                }
                line.setPosition(x1,y1,x2/scene.scale-scene.x,y2/scene.scale-scene.y);
                
                line.redraw()
            }
        },30)
        document.onmousemove = (e)=>{
            e2 = e
            moved = true
        }
        document.onmouseup = (e)=>{
            if(snapElement!=null){
                svg.point.connectTo(snapElement.point,line);
                snapElement.point.connectTo(svg.point,line);
            }else{
                line.element.remove()
            }
            snapElement = null
            clearInterval(interval)
            dragging = false
        }
        document.onmouseleave = (e)=>{
            clearInterval(interval)
            dragging = false
        }
    }
    svg.onmouseenter=(e)=>{
        if(dragging==true){
            if(currentElement!=null&&currentElement!=svg
                &&currentElement.point.type!=svg.point.type
                &&currentElement.point.mode==svg.point.mode){
                snapElement = svg;
            }
        }
    }
    svg.onmouseleave=(e)=>{
        if(dragging==true){
            snapElement = null
        }
    }

    const point = new ConnectorPoint(element,element.data,input,type,svg);
    svg.point = point;
    return point
}

function repositionNode(element){
    if(element.nodeObject==null){return false}
    const nodeObject = element.nodeObject;
    const scene = nodeObject.parentScene;
    nodeObject.updateLinePositions();
    element.style.transform="translate("+(nodeObject.px+scene.x)+"px,"+(nodeObject.py+scene.y)+"px)"
}

function repositionScene(element){
    const scene = element.scene;
    element.style.transform = "scale("+scene.scale+")";
    element.style.width=scene.width/scene.scale+"px";
    element.style.height=scene.height/scene.scale+"px";
    element.style.left=""+(scene.width/2)-(scene.width/(scene.scale*2))+"px"
    element.style.top=""+(scene.height/2)-(scene.height/(scene.scale*2))+"px"
    element.style.backgroundPosition=""+scene.x+"px "+scene.y+"px"
}

function addParentDragListeners(elm) {
    let pos1=0,pos2=0,pos3=0,pos4=0;
    elm.onmousedown=dragMouseDown;
    let moved = true;
    let justSet = false;
    const nodeObject = elm.parentElement.nodeObject

    function dragMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        moved = false;
        if(nodeObject.parentScene.selectedElement!=null&&nodeObject.parentScene.selectedElement!=elm.parentElement.nodeObject){
            nodeObject.parentScene.selectedElement.deselect()
        }
        if(nodeObject.parentScene.selectedElement!=nodeObject){
            nodeObject.select()
            justSet = true;
        }
    }
    function elementDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        nodeObject.setPosition(nodeObject.x - pos1/nodeObject.parentScene.scale,nodeObject.y - pos2/nodeObject.parentScene.scale)

        repositionNode(elm.parentElement);
        moved = true;
    }
    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        if(moved==false){
            if(e.target==elm.children[0]||e.target==elm.children[0].children[0]){
                elm.parentElement.nodeObject.select()
                if(elm.parentElement.getAttribute("open")=="true"){
                    elm.parentElement.setAttribute("open","false");
                    for(const a of elm.parentElement.children[1].children){
                        if((a.type!=null)&&(a.type=="display")){
                            a.style.display = "none"
                        }
                    }
                    elm.children[0].style.transform = "rotate(-180deg)"
                }else{
                    elm.parentElement.setAttribute("open","true");
                    for(const a of elm.parentElement.children[1].children){
                        if((a.type!=null)&&(a.type=="display")){
                            a.style.display = "block"
                        }
                    }
                    elm.children[0].style.transform = "rotate(0deg)"
                }
                nodeObject.updateLinePositions();
            }else{
                if(nodeObject.parentScene.selectedElement==nodeObject){
                    if(justSet == false){
                        nodeObject.parentScene.selectedElement.deselect()
                    }
                }
            }
        }
        justSet = false;
    }
}

function addCanvasZoomListeners(elm) {
    elm.onwheel = handleScroll
    function handleScroll(e){
        const bounds = elm.getBoundingClientRect()
        const xPos = e.clientX-bounds.x
        const yPos = e.clientY-bounds.y
        const scalePrev = elm.scene.scale
        elm.scene.scale-=(elm.scene.scale*e.deltaY)/1000
        if(elm.scene.scale<0.2){
            elm.scene.scale=0.2
        }else if(elm.scene.scale>2){
            elm.scene.scale=2
        }
        elm.scene.x -= (xPos*(1-(scalePrev/elm.scene.scale)))/scalePrev
        elm.scene.y -= (yPos*(1-(scalePrev/elm.scene.scale)))/scalePrev
        repositionScene(elm)
        for(const a of elm.children){
            if(a.nodeObject != null){
                repositionNode(a)
            }else{
                a.lineObject.redraw()
            }
        }
    }
}

function addCanvasDragListeners(elm) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elm.onmousedown = dragMouseDown;
    let moved = false
    function dragMouseDown(e) {
        moved = false
        
        //e.preventDefault();
        e.stopPropagation();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        moved = true
        
        e.preventDefault();
        e.stopPropagation();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elm.scene.y = (elm.scene.y - pos2/elm.scene.scale);
        elm.scene.x = (elm.scene.x - pos1/elm.scene.scale);
        repositionScene(elm)
        for(const a of elm.children){
            if(a.nodeObject != null){
                repositionNode(a)
            }else{
                a.lineObject.redraw()
            }
        }
    }

    function closeDragElement() {
        if(moved == false){
            if(elm.scene.selectedElement!=null){
                elm.scene.selectedElement.deselect()
            }
        }
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function handleKeyPresses(element){
    const scene = element.scene
    document.addEventListener("keydown",(e)=>{
        console.log(e);
        if(e.key=="Escape"){
            if(currentElement!=null){
                currentElement.point.deselect()
                currentElement = null
                snapElement = null
            }
        }
        if(e.key=="Backspace"||e.key=="Delete"){
            if(scene.selectedElement!=null){
                const activeNode = scene.selectedElement
                activeNode.deselect()
                activeNode.delete()
            }
        }
        if(e.key=="z"&&e.ctrlKey==true){
            console.log("undo")
        }
        if(e.key=="a"){
            e.stopPropagation()
            e.preventDefault()
            createAddMenu(scene);    
        }
    })
}

let hoveredElement = null
function createAddMenu(scene){
    const menu = document.createElement("div");
    menu.mode = "normal"
    menu.style = "color:white;font-family: 'Verdana';font-weight:700;font-size:12px;user-select:none;overflow: visible;width:125px;position: absolute;background: rgba(50, 50, 50, 1); border-radius: 9px; padding: 5px; display: flex; flex-direction: column; gap: 7px; z-index: 1000;";
    const menuX = mouseX
    const menuY = mouseY
    menu.style.top = menuY+"px"
    menu.style.left = menuX+"px"
    menu.style.boxShadow = "0px 0px 10px 5px rgba(0,0,0,0.5)"

    console.log(mouseY+" "+mouseX);
    const searchBar = document.createElement("input")
    searchBar.type = "text";
    searchBar.placeholder = "Search...";
    searchBar.style = "color:black;font-family: 'Verdana';font-weight:400;font-size:12px;padding: 5px; border-radius: 5px; border: none; outline: none; width: 100%;";
    menu.appendChild(searchBar);
    const optionsContainer = document.createElement("div");
    optionsContainer.style = "display: flex; flex-direction: column; gap: 5px; max-height: 205px;overflow:visible";
    menu.appendChild(optionsContainer);

    for(const category in paramReference){
        const optionElement = document.createElement("div");
        optionElement.textContent = paramReference[category].categoryName||category
        optionElement.style = "display:flex;flex-align:center;height:25px;width:100%;overflow:visible;padding: 5px; background: rgba(80, 80, 80, 1); border-radius: 5px; cursor: pointer;";
        optionsContainer.appendChild(optionElement);

        const arrow = createSvg({width:15,height:15,path:"M 8 3 L 13 7.5 L 8 12",strokeColor:"rgba(255,255,255,1)",strokeWidth:"2"})
        arrow.style = "height: 15px; width: auto; aspect-ratio:1;margin-left:auto;"
        optionElement.appendChild(arrow)

        const subOptionsContainer = document.createElement("div");
        subOptionsContainer.style = "border-radius:9px;margin-top:-10px;background-color:rgba(60,60,60,1);position: absolute;width:150px;margin-left: 115px;display: none; flex-direction: column; gap: 5px; padding: 5px;";
        subOptionsContainer.style.boxShadow = "0px 0px 10px 5px rgba(0,0,0,0.5)"

        optionElement.appendChild(subOptionsContainer)
        console.log(paramReference[category].lookup)
        const array = Array.from(paramReference[category].lookup)
        let hoveredSubElement = null;
        for(let i=0;i<array.length;i++){
            const name = paramReference[category].names?paramReference[category].names[i]:array[i]
            const subOptionElement = document.createElement("div");
            subOptionElement.textContent = name
            subOptionElement.style = "padding: 5px; background: rgba(100, 100, 100, 1); border-radius: 5px; cursor: pointer;";
            subOptionsContainer.appendChild(subOptionElement);

            subOptionElement.addEventListener("click", () => {
                menu.remove();
                const newNode = document.createElement("div")
                newNode.setAttribute("node-type",category)
                newNode.setAttribute("node-id",array[i])
                newNode.setAttribute("name",name)

                const bounds = scene.element.getBoundingClientRect()
                const x = (menuX-bounds.x)/scene.scale
                const y = (menuY-bounds.y)/scene.scale;

                newNode.setAttribute("x",(x-scene.x));
                newNode.setAttribute("y",(y-scene.y))
                scene.element.appendChild(newNode)
                initializeNode(newNode,scene)
            });
            subOptionElement.addEventListener("mouseenter", () => {
                if(hoveredSubElement!=null){
                    hoveredSubElement.style.filter = "none"
                }
                subOptionElement.style.filter = "brightness(90%)"
                hoveredSubElement = subOptionElement
            });   
        }

        optionElement.addEventListener("mouseenter", () => {
            if(hoveredElement!=null){
                hoveredElement.style.display = "none";
                hoveredElement.parentElement.style.filter = "none"
            }
            subOptionsContainer.style.display = "flex"
            optionElement.style.filter = "brightness(90%)"
            hoveredElement = subOptionsContainer
        });
    }

    document.body.appendChild(menu);

    let hoveredSubElement = null;
    searchBar.addEventListener("input", (e) => {
        const query = searchBar.value.toLowerCase();
        hoveredSubElement = null;
        optionsContainer.childNodes.forEach(optionElement => {
            const optionName = optionElement.firstChild.textContent.toLowerCase();
            const matches = optionName.includes(query);
            if(matches){
                if(hoveredSubElement==null){
                    hoveredSubElement = optionElement
                    optionElement.style.filter = "brightness(85%)"
                }
                optionElement.style.display = "flex"
            }else{
                optionElement.style.display = "none"
            }
        }); 
    });

    searchBar.addEventListener("keydown", (e)=> {
        if(menu.mode=="normal"){
            optionsContainer.textContent = ""
            optionsContainer.style.overflow = "hidden"
            for(const category in paramReference){
                const array = Array.from(paramReference[category].lookup)
                for(let i=0;i<array.length;i++){
                    const name = paramReference[category].names?paramReference[category].names[i]:array[i]
                    const subOptionElement = document.createElement("div");
                    subOptionElement.textContent = name
                    subOptionElement.style = "flex-shrink:0;height:25px;padding: 5px; background: rgba(100, 100, 100, 1); border-radius: 5px; cursor: pointer;";
                    optionsContainer.appendChild(subOptionElement);
                    subOptionElement.createNode = ()=>{
                        menu.remove();
                        const newNode = document.createElement("div")
                        newNode.setAttribute("node-type",category)
                        newNode.setAttribute("node-id",array[i])
                        newNode.setAttribute("name",name)
        
                        const bounds = scene.element.getBoundingClientRect()
                        const x = (menuX-bounds.x)/scene.scale
                        const y = (menuY-bounds.y)/scene.scale;
        
                        newNode.setAttribute("x",(x-scene.x));
                        newNode.setAttribute("y",(y-scene.y))
                        scene.element.appendChild(newNode)
                        initializeNode(newNode,scene)
                    }
                    subOptionElement.addEventListener("click", () => {
                        subOptionElement.createNode()
                    });
                    subOptionElement.addEventListener("mouseenter", () => {
                        if(hoveredSubElement!=null){
                            hoveredSubElement.style.filter = "none"
                        }
                        subOptionElement.style.filter = "brightness(85%)"
                        hoveredSubElement = subOptionElement
                    });
                }
            }
        }
        console.log(e.key)
        if(e.key=="Enter"){
            if(hoveredSubElement!=null){
                hoveredSubElement.createNode()
            }
        }
        menu.mode = "search"
        e.stopPropagation()
    })
    
    searchBar.focus();
}

function elementReady(sel){return new Promise((resolve, reject) => {
    const el=document.querySelector(sel);
    if(el){resolve(Array.from(document.querySelectorAll(sel)));}
    new MutationObserver((mutationRecords,observer)=>{Array.from(document.querySelectorAll(sel)).forEach(element =>{resolve(Array.from(document.querySelectorAll(sel)));observer.disconnect();});}).observe(document.documentElement,{childList:true,subtree:true});});
}
function modifyElements(selector, callback) {
elementReady(selector).then(element2 => {if(element2.length==undefined){callback(element2)
    }else{element2.forEach(element2 => {callback(element2);});}});
}

class Scene {
    constructor(w,h,element){
        this.x = 0;
        this.y = 0;
        this.scale = 0.7;
        this.nodes = [];
        this.connections = [];
        this.width = w;
        this.height = h;
        this.element = element
        this.selectedElement = null;
    }
    toSceneCoords(x,y){
        const bounds = this.element.getBoundingClientRect()
        const x2 = (x);
        const y2 = (y);
        return {x:x2,y:y2}
    }
    createConnections(){
        for(const a of this.connections){
            if(a.type=="input"){
                let point1 = null
                let point2 = null
                for(const b of this.connections){
                    if(b.id==a.id&&b!=a){
                        point1=a
                        point2=b
                        break;
                    }
                }
                if(point1!=null&&point2!=null){
                    const color = a.parentNode.inputPoints[a.index].svg.children[0].getAttribute("fill");
                    const line = new Connector(0,0,100,100,this,color);
                    a.parentNode.inputPoints[a.index].connectTo(point2.parentNode.outputPoints[point2.index],line);
                    point2.parentNode.outputPoints[point2.index].connectTo(a.parentNode.inputPoints[a.index],line);
                    line.refreshPosition()
                }
            }
        }
    }
}

class Connector {
    constructor(x1,y1,x2,y2,scene,color,input){
        this.input = input==null?"none":input;
        this.active = true;
        this.connected = false;
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.parentScene = scene
        this.xOff = 1*this.parentScene.x
        this.yOff = 1*this.parentScene.y
        this.inputPoint = null;
        this.outputPoint = null;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.element = svg;
        svg.style="position:absolute;height: 0px; width: 0px;opacity:0;"
        
        svg.setAttribute('width', '0');
        svg.lineObject = this;
        svg.setAttribute('height', '0');        
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        const path = document.createElementNS("http://www.w3.org/2000/svg","path")
        this.path = path
        this.path.setAttribute("stroke",color)
        this.path.setAttribute("stroke-width","3")
        this.path.setAttribute("d","M 0 0 L 100 100")
        this.path.setAttribute("fill","rgba(255,255,255,0)")

        svg.style="pointer-events:none;position:absolute;z-index:-1;"
        this.path.style="pointer-events:all;";
        svg.appendChild(this.path)
        this.parentScene.element.appendChild(svg);
        this.path.onmouseenter = (e)=>{
            if(this.connected==false){return}
            e.stopPropagation()
            this.path.style.cursor = "pointer"
            this.path.setAttribute("stroke","rgba(255,100,100,1)");
            this.path.setAttribute("stroke-width","5")
        };
        this.path.onmouseleave = (e)=>{
            if(this.connected==false){return}
            e.stopPropagation()
            this.path.style.cursor = "default"
            this.path.setAttribute("stroke",color)
            this.path.setAttribute("stroke-width","3")
        }
        this.path.onclick = (e)=>{
            if(this.connected==false){return}
            e.stopPropagation()
            this.deleteLine();
        }
        this.path.onmousemove = (e)=>{
            if(this.connected==false){return}
            e.stopPropagation()
            e.preventDefault()
        }
    }
    setPosition=(x1,y1,x2,y2)=>{
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }
    redraw=()=>{
        const s = this.parentScene.scale
        const expand = 30;
        const coords = this.parentScene.toSceneCoords(this.x2-(this.x1),this.y2-(this.y1));
        var x2 = coords.x;
        const y2 = coords.y

        var shiftX = 0;
        var shiftY = 0;
        if(x2<0){
            shiftX=x2
        }
        if(y2<0){
            shiftY=y2;
        }
        const xOff = this.parentScene.x+shiftX;
        const yOff = this.parentScene.y+shiftY;

        //let fx1,fy1,fx2,fy2;
        const fx1 = (-1*shiftX+expand)
        const fy1 = (-1*shiftY+expand);
        const fx2 = (x2+(-1*shiftX)+expand)
        const fy2 = (y2+(-1*shiftY)+expand)
        let offset1, offset2
        offset1 = -30
        offset2 = 30;
        if(this.connected==false){
            if(this.input=="output"){
                offset1 = 30
                offset2 = -30;
            }else if(this.input=="input"){
                offset1 = -30
                offset2 = 30
            }
        }
        //this.element.children[0].setAttribute("d","M "+fx1+" "+fy1+" L "+fx2+" "+fy2+"");
        this.element.children[0].setAttribute("d","M "+fx1+" "+fy1+" C "+(fx1+offset1)+" "+fy1+", "+(fx2+offset2)+" "+fy2+", "+fx2+" "+fy2+"");
        const bounds = this.path.getBoundingClientRect();
        const bounds2 = this.element.getBoundingClientRect();
        this.element.setAttribute('width', bounds.width/s+expand*2);
        this.element.setAttribute('height', bounds.height/s+expand*2);
        this.element.style.transform = "translate("+(xOff+this.x1-expand)+"px,"+(yOff+this.y1-expand)+"px)"   
    }
    refreshPosition=()=>{
        if((this.inputPoint.svg!=null)&&(this.outputPoint.svg!=null&&this.active==true)){
            this.connected = true;
            const element = this.inputPoint.element
            const snapElement = this.outputPoint.svg
            const svg = this.inputPoint.svg
            const parent = element.parentElement.parentElement
            const selfBounds = svg.getBoundingClientRect()
            const parentBounds = parent.getBoundingClientRect()
            const scene = parent.nodeObject.parentScene
            const relX = ((selfBounds.x+selfBounds.width/2) - parentBounds.x)/scene.scale
            const relY = ((selfBounds.y+selfBounds.height/2) - parentBounds.y)/scene.scale
            currentElement = svg
                    const x1 = relX+parent.nodeObject.px
                    const y1 = relY+parent.nodeObject.py
                        const selfBounds2 = snapElement.getBoundingClientRect()
                        const parentBounds2 = snapElement.parentElement.parentElement.parentElement.getBoundingClientRect()
                        const relX2 = ((selfBounds2.x+selfBounds2.width/2) - parentBounds2.x)/scene.scale
                        const relY2 = ((selfBounds2.y+selfBounds2.height/2) - parentBounds2.y)/scene.scale
                        const x2 = (relX2+snapElement.parentElement.parentElement.parentElement.nodeObject.px+scene.x)*scene.scale;
                        const y2 = (relY2+snapElement.parentElement.parentElement.parentElement.nodeObject.py+scene.y)*scene.scale;
                    this.setPosition(x1,y1,x2/scene.scale-scene.x,y2/scene.scale-scene.y);
                    this.redraw();
            
        }
    }
    deleteLine=()=>{
        const parentNode1 = this.inputPoint.element.parentElement.parentElement.nodeObject
        const parentNode2 = this.outputPoint.element.parentElement.parentElement.nodeObject
        const t1 = parentNode2.outputPoints.find((e)=>{return e==this.outputPoint}).outputConnectors
        const t2 = t1.indexOf(this.inputPoint)
        t1.splice(t2,1)

        console.log();
        this.element.remove()
        this.active = false
    }
}

class Node {
    constructor(x,y,scene,element){
        this.snap = 20
        this.x = x;
        this.y = y;
        this.px = Math.round(this.x/this.snap)*this.snap
        this.py = Math.round(this.y/this.snap)*this.snap;
        this.scale = 1;
        this.parentScene = scene;
        this.inputPoints = []
        this.outputPoints = []
        this.parameters = []
        this.element=element
        this.wrapperList = []
        this.selected = false
    }
    setPosition(x,y){
        this.x = x;
        this.y = y
        this.px = Math.round(this.x/this.snap)*this.snap
        this.py = Math.round(this.y/this.snap)*this.snap;
        repositionNode(this.element)
    }
    select(){
        if(this.selected){return};
        this.selected = true
        this.element.style.boxShadow = dropShadowSelected
        this.border = document.createElement("div")
        this.border.style = "z-index:200;position:absolute;top:0px;left:0px;width:100%;height:100%;border-radius:7px;pointer-events:none;"
        this.border.style.border="2px solid rgba(255,255,255,0.3)"
        this.border.style.backgroundColor = "rgba(255,255,255,0.05)"
        this.border.style.boxShadow = dropShadowSelected
        this.element.appendChild(this.border);
        repositionNode(this.element)
        if(this.parentScene.selectedElement!=null){
            this.parentScene.selectedElement.deselect()
        }
        this.parentScene.selectedElement = this
    }
    deselect(){
        this.border.remove()
        this.selected = false;
        this.parentScene.selectedElement = null
        this.element.style.boxShadow = dropShadowDark;
        this.element.style.border = "none"
        repositionNode(this.element)
    }
    updateAll(){
        this.element.updateAll()
    }
    updateLinePositions(){
        for(const a of this.inputPoints){
            if(a.connectedTo!=null){
                a.refreshPosition()
            }
        }
        for(const a of this.outputPoints){
            if(a.connectedTo!=null){
                a.refreshPosition();
            }
        }
    }
    fillWrapperList(){
        for(const a of this.element.children[1].children){
            this.wrapperList.push(a)
        }
    }
    delete(){
        for(const a of this.inputPoints){
            if(a.connectedTo!=null){
                a.inputLine.deleteLine()
            }
        }
        for(const a of this.outputPoints){
            for(const b of a.outputLines){
                b.deleteLine()
            }
        }
        this.element.remove()
    }
}

class ConnectorPoint {
    constructor(element,data,mode,type,svg){
        this.svg = svg
        this.element = element
        this.data = data
        this.mode = mode
        this.type = type
        this.connected = false
        this.inputConnector = null //connectors if type is input
        this.outputConnectors = [] //connectors if type is output
        this.connectedTo = null;
        this.line = null;
        this.inputLine = null
        this.outputLines = []
        if(element!=null){
            //this.connectedTo = new ConnectorPoint(null,10)
            //this.node.updateAll();
        }
    }
    refreshValue(){
        if(this.inputConnector!=null){
            //this.element.updateValue(this.inputConnector.refreshValue())
        }
        this.data = this.element.data
        return this.data
    }

    setOutputValue(e){
        this.data = e
        for(const a of this.outputConnectors){
            a.setInputValue(e)
        }
    }
    setInputValue(e){
        this.data = e
        this.element.updateValue(e)
    }

    connectTo(point,line){
        line.connected = true;
        //this.line = line
        this.connectedTo = point
        this.parentObject1 = this.element.parentElement.parentElement.nodeObject

        this.parentObject2 = point.element.parentElement.parentElement.nodeObject
        if(this.type=="input"){
            if(this.inputConnector!=null){
                this.inputLine.deleteLine()
            }
            this.inputConnector = point
            this.inputLine=line
            line.inputPoint = this
            line.outputPoint = point
            this.setInputValue(point.data)
            this.element.setControlled()
            //this.parentObject1.updateAll()
        }else{
            this.outputConnectors.push(point)
            this.outputLines.push(line)
            line.inputPoint = point
            line.outputPoint = this
            //this.parentObject2.updateAll()
        }
    }
    refreshPosition(){
        if(this.type=="input"){
            this.inputLine.refreshPosition()
        }else if(this.type=="output"){
            for(const a of this.outputLines){
                a.refreshPosition()
            }
        }
    }
}

class ColorPoint {
    constructor(position, color, base, element){
        this.selected = false
        this.position = position
        this.color = color
        this.base = base
        this.element = element

        this.svg = createSvg({path:"M 3 18 L 17 18 L 17 10 L 10 5 L 3 10 Z",width:20,height:20,fillColor:"rgba("+color[0]+","+color[1]+","+color[2]+",1)",strokeColor:"rgba(255,255,255,1)",strokeWidth:2});
        this.refresh = false;
        this.updating = false;
        this.svg.style="position:absolute;z-index:100;cursor:pointer;"
        this.svg.style.filter = "drop-shadow(2px 2px 2px rgba(0,0,0,1))"
        const nodeObject = element.parentElement.parentElement.nodeObject
        const bounds = element.parentElement.parentElement.getBoundingClientRect()
        const bounds2 = element.children[1].getBoundingClientRect();
        this.svg.style.top=(bounds2.y-bounds.y)/nodeObject.parentScene.scale+5+"px";
        this.svg.style.left=position*(bounds2.width-2)/nodeObject.parentScene.scale-1+"px";
        element.appendChild(this.svg)
        this.svg.onmousedown = (e)=>{
            e.stopPropagation()
            if(this.selected==false){
                this.select()
            }
            document.onmouseup = (e)=>{
                this.deselect()
            }
            document.onmouseleave = (e)=>{
                this.deselect()
            }
            if(!this.base){
                document.onmousemove = (e)=>{
                    e.preventDefault()
                    this.handleMouse(e)
                }
            }
        }
        setInterval(()=>{
            if(this.refresh){
                this.element.refreshCanvas()
                
                this.refresh = false
            }
        },50)
    }
    handleMouse = (e)=>{
        const nodeObject = this.element.parentElement.parentElement.nodeObject
        const bounds = this.svg.parentElement.getBoundingClientRect()
        const bounds2 = this.svg.parentElement.parentElement.getBoundingClientRect();
        const bounds3 = this.element.children[1].getBoundingClientRect();
        const x = e.clientX-bounds.x;
        const y = e.clientY-bounds.y
        const x2 = (x)/((bounds3.width)/nodeObject.parentScene.scale)
        this.position = Math.min(Math.max((x2)/nodeObject.parentScene.scale-0.01,0),1)
        //this.svg.style.left=position*(bounds2.width-2)/nodeObject.parentScene.scale-1+"px";
        this.svg.style.left=this.position*(bounds3.width-2)/nodeObject.parentScene.scale-1+"px";
        this.refresh = true;
        this.element.parentElement.children[3].updateValue(Math.round(this.position*1000)/1000);

    }
    select = ()=>{
        this.element.selectedPoint = this
        this.updating = false;
        this.selected = true
        this.svg.style.transform = "scale(1.1)";
        this.svg.style.filter = "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))"
        //console.log(this.element.parentElement.children[4].grayscale)
        if(this.element.parentElement.children[4]!=null){
            if(this.base){this.element.parentElement.children[3].setControlled()}else{
                this.element.parentElement.children[3].setNormal()
            }
            this.element.parentElement.children[3].updateValue(this.position)
            if(this.element.parentElement.children[4].grayscale==true){
                this.element.parentElement.children[5].updateValue(this.color[0])
            }else{
                this.element.parentElement.children[5].updateValue(this.color[0])
                this.element.parentElement.children[6].updateValue(this.color[1])
                this.element.parentElement.children[7].updateValue(this.color[2])
            }
        }
    }
    quietSelect = ()=>{
        this.element.selectedPoint = this
        this.updating = true;
        this.selected = false
        //console.log(this.element.parentElement.children[4].grayscale)

        if(this.element.parentElement.children[4]!=null){
            if(this.base){this.element.parentElement.children[3].setControlled()}else{
                this.element.parentElement.children[3].setNormal()
            }
            this.element.parentElement.children[3].updateValue(this.position)
            if(this.element.parentElement.children[4].grayscale==true){
                this.element.parentElement.children[5].updateValue(this.color[0])
            }else{
                this.element.parentElement.children[5].updateValue(this.color[0])
                this.element.parentElement.children[6].updateValue(this.color[1])
                this.element.parentElement.children[7].updateValue(this.color[2])
            }
        }
    }
    deselect = ()=>{
        this.updating = true;
        this.selected = false
        this.svg.style.transform = "scale(1)"
        this.svg.style.filter = "drop-shadow(2px 2px 2px rgba(0,0,0,1))"
        document.onmouseup = null
        document.onmouseleave = null
        document.onmousemove = null
    }
    setColor=(color)=>{
        if(this.updating==true){
            this.color = color
            this.svg.children[0].setAttribute("fill","rgba("+color[0]+","+color[1]+","+color[2]+",1)");
            this.refresh = true
        }
    }
    setPosition = (position)=>{
        if(this.base==false){
            this.position = position
            this.svg.style.left=position*(this.element.children[1].getBoundingClientRect().width-2)/this.element.parentElement.parentElement.nodeObject.parentScene.scale-1+"px";
            this.refresh=true;
        }
    }
    delete=()=>{
        this.svg.remove()
    }
}

function addInsetShadowBeforeElement(element) {
    let style = document.getElementById("dynamic-shadow-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "dynamic-shadow-style";
        document.head.appendChild(style);
    }
    const uniqueClass = "shadow-overlay-" + Math.random().toString(36).substr(2, 9);
    element.classList.add(uniqueClass);

    // Define the CSS rule
    const cssRule = `
        .${uniqueClass}::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.5),inset -2px -2px 20px rgba(255, 255, 255, 0.5);
            pointer-events: none;
            z-index: 1;
        }
    `;

    // Append the CSS rule to the style element
    style.appendChild(document.createTextNode(cssRule));
}

function createGradient(width, height) {
    console.log("canvas")
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext("2d",{ willReadFrequently: true });
    
    // Fill with a gradient for demonstration
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Convert canvas to data URL
    return canvas.toDataURL("image/png");
}

import { makeNoise2D } from "./openSimplexNoise.js";

function createNoise(width, height, scale, seed, octaves, persistence, lacunarity) {
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
    console.log(width+" "+height)
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let amplitude = 1;
            let frequency = 1;
            let noiseValue = 0;

            for (let o = 0; o < octaves; o++) {
                noiseValue += amplitude * noise2D(x * frequency / scale, y * frequency / scale);
                amplitude *= persistence;
                frequency *= lacunarity;
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

function createDropdown(params){
    params = params || {};
    const openHeight = params.openHeight||null
    const dropdownWrapper = document.createElement("div")
    const dropdownInner = document.createElement("div")
    dropdownWrapper.value = null
    const element = document.createElement("div")
    const dropdownText = document.createElement("span")
    const dropdownSvg = createSvg({path:"M 5 8 L 10 12 L 15 8"});
    dropdownInner.options = params.options || ["Linear","Ease"]
    const height = 25
    dropdownSvg.style.marginLeft="auto"
    dropdownInner.selectedOption = 0
    let tempSelect = null
    
    dropdownWrapper.appendChild(dropdownInner)
    dropdownInner.appendChild(element)
    element.appendChild(dropdownText)
    element.appendChild(dropdownSvg)

    dropdownText.textContent = dropdownInner.options[dropdownInner.selectedOption];
    dropdownWrapper.value = dropdownInner.options[dropdownInner.selectedOption];

    dropdownWrapper.style="color:white;font-family: 'Verdana';font-weight:700;font-size:12px;height:"+height+"px;width:"+(params.width||"fit-content")+";justify-content:flex-start;display:flex;flex-direction:column;overflow:visible;z-index:200;cursor:pointer;"
    dropdownInner.style="gap:2px;height:fit-content;width:100%;justify-content:flex-start;display:flex;flex-direction:column;overflow:visible;z-index:200;"
    dropdownInner.style.background="rgba(60,60,60,1)"
    dropdownInner.style.borderRadius="5px"
    
    dropdownInner.style.border="1px solid rgba(255,255,255,0.2)"
    //dropdownInner.style.backdropFilter="blur(5px)"

    function close(){
        element.open=false
        dropdownInner.style.boxShadow="none"
        if(params.openHeight!=null){
            dropdownWrapper.style.height="fit-content";
        }
        for(let i=1;i<dropdownInner.children.length;i++){
            dropdownInner.children[i].style.display="none"
        }
        if(tempSelect!=null){
            tempSelect.removeHover()
        }
    }
    function open(){
        element.open=true
        dropdownInner.style.boxShadow="2px 2px 7px 0px rgba(0,0,0,1)"
        if(params.openHeight!=null){
            dropdownWrapper.style.height=params.openHeight;
        }
        for(let i=1;i<dropdownInner.children.length;i++){
            dropdownInner.children[i].style.display="flex"
        }
    }

    function select(object){
        dropdownInner.selectedOption=dropdownInner.options.indexOf(object.textContent)
        dropdownText.textContent = object.textContent;
        dropdownWrapper.value = object.textContent;
        if(params.callback!=null){
            params.callback()
        }
        close()
    }

    let i = 0;
    for(const a of dropdownInner.options){
        const option = document.createElement("div")
        option.textContent = a
        option.index = i
        option.style.flexShrink = "0"
        option.style.display="none"
        option.style.width="100%"
        option.style.height=height+"px"
        option.style.alignItems="center"
        option.style.cursor="pointer"
        option.style.userSelect="none"
        option.style.padding="7px";
        option.style.background="rgba(0,0,0,0)"
        option.onmousedown=(e)=>{
            e.stopPropagation()
            select(option)
        }
        option.onmouseenter=(e)=>{
            option.hover()
        }
        option.hover=()=>{
            option.style.background="rgba(0,0,0,0.5)"
            if(tempSelect!=null){
                tempSelect.removeHover()
            }
            tempSelect = option
        }
        option.removeHover=()=>{
            tempSelect = null
            option.style.background="rgba(0,0,0,0)"
        }

        dropdownInner.appendChild(option);
        i++;
    }


    element.open = false
    element.style="flex-shrink:0;background-color:rgba(0,0,0,0);border:none;"
    element.style.width="100%"
    element.style.height=height+"px"
    element.style.display="flex"
    element.style.flexDirection="row"
    element.style.alignItems="center"
    element.style.cursor="pointer"
    element.style.userSelect="none"
    element.style.padding="5px"
    element.style.paddingLeft="8px"
    element.style.gap="2px"
    element.style.borderRadius="5px"
    element.style.background="rgba(0,0,0,0.2)"
    element.onmousedown = (e)=>{
        e.stopPropagation()
        if(element.open==true){
            close()
        }else{
            open()
        }
        document.onkeydown = (e)=>{
            if(e.key=="Enter"){
                if(tempSelect!=null){
                    select(tempSelect);
                }
                close()
            }
            console.log(e.key)
            if(e.key=="ArrowDown"){
                if(tempSelect!=null){
                    if(tempSelect.index<dropdownInner.children.length-2){    
                        dropdownInner.children[tempSelect.index+2].hover()
                    }else{
                        dropdownInner.children[1].hover()
                    }
                }else{
                    dropdownInner.children[1].hover()
                }
            }
            if(e.key=="ArrowUp"){
                if(tempSelect!=null){
                    if(tempSelect.index>0){    
                        dropdownInner.children[tempSelect.index].hover()
                    }else{
                        dropdownInner.children[dropdownInner.children.length-1].hover()
                    }
                }else{
                    dropdownInner.children[dropdownInner.children.length-1].hover()
                }
            }
        }
    };
    dropdownInner.onmouseleave = (e)=>{
        close()
    }

    return dropdownWrapper
}

function createSvg(params){
    params = params || {};
    //const {width, height, strokeWidth, strokeColor, fillColor}
    const width = params.width || 20;
    const height = params.height || 20;
    const strokeWidth = params.strokeWidth==null?2:params.strokeWidth;
    const strokeColor = params.strokeColor || "rgba(255,255,255,1)";
    const fillColor = params.fillColor || "rgba(0,0,0,0)";
    const pathData = params.path || "M 3 10 L 17 10";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style="height: "+height+"px; width: "+height+"px; aspect-ratio:1;transition: transform 0.3s ease-out;"
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

   
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    const path = document.createElementNS("http://www.w3.org/2000/svg","path");

    path.setAttribute("fill",fillColor);
    path.setAttribute("stroke",strokeColor);
    path.setAttribute("stroke-width",strokeWidth);
    path.setAttribute("d",pathData);

    svg.appendChild(path);
    return svg
}