import{j as t,r as c,M as ue,O as De,B as oe,F as ve,S as ee,U as ge,V as G,W as ne,H as le,N as ze,C as Le,a as L,b as J,A as re,c as xe,d as ye,e as be,P as He,f as $e,g as Ue,E as we,L as Se,h as Me,i as ke,k as Ie,l as qe,m as Te,n as je,o as Re,u as Oe,p as Ve}from"./index-ChgYeIKL.js";import{Q as Ge}from"./QuantumNav-D1QvHs51.js";import{h as Z}from"./HomeIndex.module-C9zAhSSB.js";import{p as fe,g as de}from"./portalWorlds-CLl1DdwQ.js";import{B as me}from"./BeamScanButton-B_-HGEVI.js";const Qe="_quoteHighlight_1kgkr_4",We={quoteHighlight:Qe};function Ye(){return t.jsxs("div",{className:We.quoteHighlight,children:['"The universe is a terrifyingly elegant apparatus, built on the immutable laws of the machine, yet the joy and the agony of this existence are all contained within the subjective, anxious leap of self-creation . We find that the objective reality of the cosmos is, in its essence, the consciousness of a dream.Therefore, abandon the illusion of a separate self and simply be in this brief, defiant affirmation of the present moment."',t.jsx("br",{})]})}function Ke(h,e){return Array.from({length:e},()=>Array.from({length:h},()=>Math.random()>.8?1:0))}function Xe(h){const e=h.length,a=h[0].length,r=h.map(i=>i.slice());for(let i=0;i<e;i++)for(let s=0;s<a;s++){let o=0;for(let f=-1;f<=1;f++)for(let n=-1;n<=1;n++){if(f===0&&n===0)continue;const d=(i+f+e)%e,w=(s+n+a)%a;o+=h[d][w]}h[i][s]===1?r[i][s]=o===2||o===3?1:0:r[i][s]=o===3?1:0}return r}function Ze({portalState:h,onQuantumCollapse:e}){const a=c.useRef(),[r,i]=c.useState({progress:0,atBottom:!1}),[s,o]=c.useState(0),[f,n]=c.useState(0),[d,w]=c.useState(()=>Ke(60,24));c.useEffect(()=>{const v=setInterval(()=>{w(x=>Xe(x))},100);return()=>clearInterval(v)},[]),c.useEffect(()=>{let v;const x=()=>{n(Date.now()/1e3),v=requestAnimationFrame(x)};return x(),()=>cancelAnimationFrame(v)},[]);function M(v){const x=v.target.getBoundingClientRect(),R=Math.floor((v.clientX-x.left)/x.width*d[0].length),_=Math.floor((v.clientY-x.top)/x.height*d.length);w(P=>{const I=P.map(l=>l.slice());for(let l=-1;l<=1;l++)for(let $=-1;$<=1;$++){const U=(R+$+I[0].length)%I[0].length,u=(_+l+I.length)%I.length;I[u][U]=1}return I})}const p=[{className:"parallax-bg",style:v=>({transform:`translateY(${-v*60}px) scale(1.1)`,opacity:1,zIndex:0,position:"absolute",left:0,right:0,top:0,bottom:0,pointerEvents:"none",background:"radial-gradient(ellipse at 60% 60%, #0a0f1a 60%, #000 100%)",overflow:"hidden"}),content:t.jsxs("svg",{width:"100%",height:"100%",style:{position:"absolute",left:0,top:0,zIndex:0,cursor:"none"},onClick:M,children:[t.jsxs("defs",{children:[t.jsxs("linearGradient",{id:"cell-grad-1",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",stopColor:h.colors[0],stopOpacity:"0.9"}),t.jsx("stop",{offset:"100%",stopColor:h.colors[1],stopOpacity:"0.6"})]}),t.jsxs("linearGradient",{id:"cell-grad-2",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",stopColor:h.colors[1],stopOpacity:"0.8"}),t.jsx("stop",{offset:"100%",stopColor:h.colors[2],stopOpacity:"0.5"})]}),t.jsxs("linearGradient",{id:"cell-grad-3",x1:"100%",y1:"0%",x2:"0%",y2:"100%",children:[t.jsx("stop",{offset:"0%",stopColor:h.colors[2],stopOpacity:"0.7"}),t.jsx("stop",{offset:"100%",stopColor:h.colors[0],stopOpacity:"0.4"})]}),t.jsxs("filter",{id:"cell-glow",children:[t.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),t.jsxs("feMerge",{children:[t.jsx("feMergeNode",{in:"coloredBlur"}),t.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),d.map((v,x)=>v.map((R,_)=>{if(!R)return null;const I=`cell-grad-${(_+x)%3+1}`,l=2.15+.25*Math.sin(f+_*.2+x*.3),$=_/d[0].length*100,U=x/d.length*100,u=5/d[0].length*100,A=.1/d.length*100;return t.jsx("rect",{x:$+"%",y:U+"%",width:u+"%",height:A+"%",fill:`url(#${I})`,opacity:l,filter:"url(#cell-glow)",rx:"0.3",children:t.jsx("animate",{attributeName:"opacity",values:`${l};${l*1.5};${l}`,dur:"2s",repeatCount:"indefinite"})},_+"-"+x)}))]})}];c.useEffect(()=>{const v=()=>{if(!a.current)return;const x=a.current.getBoundingClientRect(),R=window.innerHeight;let _=1-Math.max(0,Math.min(1,x.bottom/R));_=Math.max(0,Math.min(1,_));const P=window.innerHeight+window.scrollY>=document.body.offsetHeight-2;i({progress:_,atBottom:P})};return window.addEventListener("scroll",v),v(),()=>window.removeEventListener("scroll",v)},[]),c.useEffect(()=>{let v;const x=()=>{o(Math.sin(Date.now()/600)),v=requestAnimationFrame(x)};return x(),()=>cancelAnimationFrame(v)},[]);const{progress:g,atBottom:m}=r,b=20.5+20.5*s,B=m?1:.15+b*.5*g+3.35*g,T=m?0:22+88*(1-b)*g,j=m?"#00fff7af":`rgba(0,255,247,${.5+.5*g})`,y=`blur(${T}px) brightness(${1+g*1.2}) saturate(${1.2+g*1.3})`,C=m?"translateY(60px)":`translateY(${-40*(1-g)}px) scale(${1+g*.7+b*.1}) skewY(${-6*g}deg)`;return t.jsxs("section",{style:{marginTop:"60px",marginBottom:"40px",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",minHeight:"120px",overflow:"hidden"},children:[p.map((v,x)=>t.jsx("div",{className:v.className,style:v.style(g),children:v.content},v.className)),t.jsx("div",{className:"progress-bar",style:{marginBottom:"50px",width:"auto",position:"relative",zIndex:3},children:t.jsx("div",{ref:a,className:"floating-code parallax-holo",style:{opacity:B,filter:y,transform:C,color:j,fontSize:m?"2em":"2.25em",transition:m?"all 0.7s cubic-bezier(0.4,0,0.2,1)":"transform 1.2s cubic-bezier(0.4,0,0.2,1), opacity 1.2s, filter 1.2s, color 1.2s",willChange:"transform, opacity, filter, color",mixBlendMode:m?"normal":"screen",fontFamily:"'Orbitron', 'Rajdhani', monospace"}})})]})}function Je({id:h,isActive:e,backgroundClass:a,children:r,animation:i}){return t.jsxs("section",{className:`quantum-scene${e?" active":""}`,id:h,children:[i,t.jsx("div",{className:`scene-background ${a}`}),t.jsx("div",{className:"scene-content",children:r})]})}function et({originalText:h,finalText:e,delay:a=3e3}){const[r,i]=c.useState(h),[s,o]=c.useState(!1),f=c.useRef(null),n=c.useRef(null),d=["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ン"];return c.useEffect(()=>(s?f.current=setTimeout(()=>{const M=e.split(""),p=new Array(M.length).fill(!1),g=Date.now(),m=2e3/M.length;let b=50;n.current=setInterval(()=>{const B=Date.now()-g,T=B/2e3;b=Math.max(10,50-T*40),M.forEach((y,C)=>{B>m*(C+1)&&(p[C]=!0)});const j=M.map((y,C)=>p[C]?y:d[Math.floor(Math.random()*d.length)]).join("");i(j),B>=2e3&&(i(e),clearInterval(n.current))},b)},a):(f.current&&clearTimeout(f.current),n.current&&clearInterval(n.current),i(h)),()=>{f.current&&clearTimeout(f.current),n.current&&clearInterval(n.current)}),[s,h,e,a]),t.jsx("span",{onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),className:"scramble-hover-span",children:r})}const ce={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ae{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const tt=new De(-1,1,1,-1,0,1);class st extends oe{constructor(){super(),this.setAttribute("position",new ve([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ve([0,2,0,0,2,0],2))}}const rt=new st;class Pe{constructor(e){this._mesh=new ue(rt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,tt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class it extends ae{constructor(e,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,e instanceof ee?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ge.clone(e.uniforms),this.material=new ee({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pe(this.material)}render(e,a,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class _e extends ae{constructor(e,a){super(),this.scene=e,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,a,r){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,f;this.inverse?(o=0,f=1):(o=1,f=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(f),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class at extends ae{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ot{constructor(e,a){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),a===void 0){const r=e.getSize(new G);this._width=r.width,this._height=r.height,a=new ne(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:le}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new it(ce),this.copyPass.material.blending=ze,this.clock=new Le}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,a){this.passes.splice(a,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const a=this.passes.indexOf(e);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(e){for(let a=e+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const a=this.renderer.getRenderTarget();let r=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),o.needsSwap){if(r){const f=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(f.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(f.EQUAL,1,4294967295)}this.swapBuffers()}_e!==void 0&&(o instanceof _e?r=!0:o instanceof at&&(r=!1))}}this.renderer.setRenderTarget(a)}reset(e){if(e===void 0){const a=this.renderer.getSize(new G);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,a){this._width=e,this._height=a;const r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class nt extends ae{constructor(e,a,r=null,i=null,s=null){super(),this.scene=e,this.camera=a,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new L}render(e,a,r){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const lt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new L(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ie extends ae{constructor(e,a=1,r,i){super(),this.strength=a,this.radius=r,this.threshold=i,this.resolution=e!==void 0?new G(e.x,e.y):new G(256,256),this.clearColor=new L(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ne(s,o,{type:le}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let w=0;w<this.nMips;w++){const M=new ne(s,o,{type:le});M.texture.name="UnrealBloomPass.h"+w,M.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(M);const p=new ne(s,o,{type:le});p.texture.name="UnrealBloomPass.v"+w,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),o=Math.round(o/2)}const f=lt;this.highPassUniforms=ge.clone(f.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ee({uniforms:this.highPassUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let w=0;w<this.nMips;w++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(n[w])),this.separableBlurMaterials[w].uniforms.invSize.value=new G(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=a,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ge.clone(ce.uniforms),this.blendMaterial=new ee({uniforms:this.copyUniforms,vertexShader:ce.vertexShader,fragmentShader:ce.fragmentShader,blending:re,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new L,this._oldClearAlpha=1,this._basic=new xe,this._fsQuad=new Pe(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,a){let r=Math.round(e/2),i=Math.round(a/2);this.renderTargetBright.setSize(r,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(r,i),this.renderTargetsVertical[s].setSize(r,i),this.separableBlurMaterials[s].uniforms.invSize.value=new G(1/r,1/i),r=Math.round(r/2),i=Math.round(i/2)}render(e,a,r,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let f=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=f.texture,this.separableBlurMaterials[n].uniforms.direction.value=ie.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=ie.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this._fsQuad.render(e),f=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const a=[];for(let r=0;r<e;r++)a.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new ee({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new G(.5,.5)},direction:{value:new G(.5,.5)},gaussianCoefficients:{value:a}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new ee({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ie.BlurDirectionX=new G(1,0);ie.BlurDirectionY=new G(0,1);const ct="_quantumCanvas_riwvc_2",ut="_quantumCanvasBottom_riwvc_15",ht="_quantumCanvasMiddle_riwvc_23",pe={quantumCanvas:ct,quantumCanvasBottom:ut,quantumCanvasMiddle:ht},Ee=({position:h="top",sceneColors:e={color1:"#00ffff",color2:"#ff00ff",color3:"#ffff00"}})=>{const a=c.useRef(null),r=c.useRef(null),i=c.useRef(null);return c.useEffect(()=>{if(!a.current)return;const s=new ye,o=new De(-1,1,1,-1,0,1),f=new be({canvas:a.current,alpha:!1,antialias:!0});f.setClearColor(0,1),f.setSize(window.innerWidth,window.innerHeight),f.setPixelRatio(Math.min(window.devicePixelRatio,2));const n=new ot(f);n.addPass(new nt(s,o));const d=new ie(new G(window.innerWidth,window.innerHeight),.5,.8,.3);n.addPass(d);const w={time:{value:0},resolution:{value:new G(window.innerWidth,window.innerHeight)},color1:{value:new L(e.color1)},color2:{value:new L(e.color2)},color3:{value:new L(e.color3)},intensity:{value:.5},spiralSpeed:{value:1.2},vortexStrength:{value:1.2}};i.current=w;const M=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,p=`
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float intensity;
      uniform float spiralSpeed;
      uniform float vortexStrength;
      
      varying vec2 vUv;
      
      // Noise function for organic movement
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.333))) * 43758.5453);
      }
      
      // Smooth noise
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (90.0 - 90.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 3.0));
        float c = noise(i + vec2(1.0, 3.0));
        float d = noise(i + vec2(1.0, 3.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      // Fractal Brownian Motion for detail
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 2.5;
        
        for(int i = 0; i < 5; i++) {
          value += amplitude * smoothNoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        
        return value;
      }
      
      void main() {
        // Normalize coordinates (center origin)
        vec2 uv = vUv;
        vec2 center = vec2(0.5, 0.5);
        vec2 pos = uv - center;
        
        // Polar coordinates for spiral
        float dist = length(pos);
        float angle = atan(pos.y, pos.x);
        
        // Vortex distortion
        float vortex = vortexStrength / (dist + 0.1);
        float spiral = angle + time * spiralSpeed + dist * 10.0;
        
        // Animated noise layers
        float noise1 = fbm(uv * 3.0 + time * 0.1);
        float noise2 = fbm(uv * 5.0 - time * 0.15);
        
        // Swirling pattern
        float pattern = sin(spiral * 5.0 + noise1 * 2.0) * 0.5 + 0.5;
        pattern = mix(pattern, noise2, 0.3);
        
        // Distance-based fade
        float fade = smoothstep(3.4, 0.0, dist);
        
        // Color mixing based on pattern
        vec3 color = mix(color1, color2, pattern);
        color = mix(color, color3, sin(spiral * 3.0 + time) * 0.5 + 0.5);
        
        // Add energy rings
        float rings = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;
        rings = pow(rings, 3.0) * 0.3;
        color += rings;
        
        // Chromatic aberration hint
        float aberration = dist * 0.02;
        
        // Final composite
        float alpha = fade * intensity * (0.7 + pattern * 0.3);
        
        gl_FragColor = vec4(color, alpha);
      }
    `,g=new ee({uniforms:w,vertexShader:M,fragmentShader:p,transparent:!0,blending:re,depthWrite:!1}),m=new He(2,2),b=new ue(m,g);s.add(b),r.current={scene:s,camera:o,renderer:f,mesh:b,composer:n,bloomPass:d};let B;const T=()=>{i.current.time.value+=.01,n.render(),B=requestAnimationFrame(T)};T();const j=()=>{const y=window.innerWidth,C=window.innerHeight;f.setSize(y,C),n.setSize(y,C),i.current.resolution.value.set(y,C)};return window.addEventListener("resize",j),()=>{cancelAnimationFrame(B),window.removeEventListener("resize",j),m.dispose(),g.dispose(),f.dispose()}},[]),c.useEffect(()=>{i.current&&(i.current.color1.value.set(e.color1),i.current.color2.value.set(e.color2),i.current.color3.value.set(e.color3))},[e]),t.jsx("canvas",{ref:a,className:`${pe.quantumCanvas} ${h==="bottom"?pe.quantumCanvasBottom:h==="middle"?pe.quantumCanvasMiddle:""}`,"aria-hidden":"true"})};function ft({portalState:h,bgRef:e,fgRef:a}){const[r,i]=c.useState(h.colors),[s,o]=c.useState(h.colors),f=c.useRef(null);return c.useEffect(()=>{o(h.colors);const n=Date.now(),d=800,w=[...r],M=()=>{const p=Date.now()-n,g=Math.min(p/d,1),m=g<.5?2*g*g:-1+(4-2*g)*g,b=w.map((B,T)=>{const j=h.colors[T],y=Ne(B),C=Ne(j),v=Math.round(y.r+(C.r-y.r)*m),x=Math.round(y.g+(C.g-y.g)*m),R=Math.round(y.b+(C.b-y.b)*m);return dt(v,x,R)});i(b),g<1&&(f.current=requestAnimationFrame(M))};return f.current&&cancelAnimationFrame(f.current),f.current=requestAnimationFrame(M),()=>{f.current&&cancelAnimationFrame(f.current)}},[h.colors]),t.jsxs(t.Fragment,{children:[t.jsx(Ee,{position:"top",sceneColors:{color1:r[0],color2:r[1],color3:r[2]}}),t.jsx(Ee,{position:"bottom",sceneColors:{color1:r[0],color2:r[1],color3:r[2]}}),t.jsx("div",{className:Z.baseDark}),t.jsx("div",{className:Z.quantumPortalLayer,style:{"--portal-color-0":r[0],"--portal-color-1":r[1],"--portal-color-2":r[2]}}),t.jsx("div",{className:Z.quantumVeil}),t.jsx("div",{className:Z.darkTopVeil}),t.jsx("div",{className:"dynamic-portal-bg","aria-hidden":"true",children:t.jsxs("svg",{width:"100%",height:"100%",viewBox:"0 0 1920 1080",className:"portal-svg",style:{"--portal-svg-background":`linear-gradient(120deg, 
              ${r[0]} 0%, 
              ${r[1]} 60%, 
              ${r[2]} 100%
            )`},children:[t.jsx("defs",{children:t.jsxs("linearGradient",{id:"portal-glow",x1:"0",y1:"0",x2:"1",y2:"1",children:[t.jsx("stop",{offset:"0%",stopColor:r[0],stopOpacity:"0.6"}),t.jsx("stop",{offset:"50%",stopColor:r[1],stopOpacity:"0.4"}),t.jsx("stop",{offset:"100%",stopColor:r[2],stopOpacity:"0.6"})]})}),t.jsx("rect",{x:"0",y:"0",width:"1920",height:"1080",fill:"url(#portal-glow)"})]})}),t.jsx("div",{ref:e,className:Z.parallaxBgLayer,"aria-hidden":"true",children:t.jsxs("svg",{width:"100%",height:"100%",viewBox:"0 0 1920 400",children:[t.jsx("defs",{children:t.jsxs("linearGradient",{id:"homepage-parallax-bg-grad",x1:"0",y1:"0",x2:"1",y2:"1",children:[t.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"1"}),t.jsx("stop",{offset:"100%",stopColor:"#0a0f1a",stopOpacity:"1"})]})}),t.jsx("rect",{x:"0",y:"0",width:"1920",height:"400",fill:"url(#homepage-parallax-bg-grad)"})]})}),t.jsx("div",{ref:a,className:Z.parallaxFgLayer,"aria-hidden":"true",children:t.jsxs("svg",{width:"100%",height:"100%",viewBox:"0 0 1920 400",children:[t.jsx("defs",{children:t.jsxs("linearGradient",{id:"homepage-parallax-fg-grad",x1:"0",y1:"0",x2:"1",y2:"1",children:[t.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"1"}),t.jsx("stop",{offset:"100%",stopColor:"#0a0f1a",stopOpacity:"1"})]})}),t.jsx("rect",{x:"0",y:"0",width:"1920",height:"400",fill:"url(#homepage-parallax-fg-grad)"})]})})]})}function Ne(h){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}function dt(h,e,a){return"#"+((1<<24)+(h<<16)+(e<<8)+a).toString(16).slice(1)}function mt({isActive:h=!1}){const e=c.useRef(),a=c.useRef(),r=c.useRef(),i=c.useRef(),s=c.useRef(),o=c.useRef(),f=c.useRef(),n=c.useRef([]),d=c.useRef([]),w=c.useRef(0),M=c.useRef(new Map);return c.useEffect(()=>{if(!e.current)return;const p=new ye;a.current=p;const g=new $e(1e3,e.current.clientWidth/e.current.clientHeight,.1,10);g.position.z=3,i.current=g;const m=new be({alpha:!0,antialias:!0});m.setSize(e.current.clientWidth,e.current.clientHeight),m.setClearColor(0,0),e.current.appendChild(m.domElement),r.current=m;const b=()=>{if(!e.current)return;const l=e.current.clientWidth,$=e.current.clientHeight;g.aspect=l/$,g.updateProjectionMatrix(),m.setSize(l,$)};window.addEventListener("resize",b);const B=Ue(),T=new we(B),j=T.attributes.position.array,y=[];for(let l=0;l<j.length;l+=6){const $=new J(j[l],j[l+1],j[l+2]),U=new J(j[l+3],j[l+4],j[l+5]),u=new oe().setFromPoints([$,U]),A=new Se({color:65338,transparent:!0,opacity:.15}),E=new Me(u,A),H=`${$.x.toFixed(6)},${$.y.toFixed(6)},${$.z.toFixed(6)}`,D=`${U.x.toFixed(6)},${U.y.toFixed(6)},${U.z.toFixed(6)}`,Y=[H,D].sort().join("|");E.userData.edgeKey=Y,E.userData.baseColor=65338,E.userData.baseOpacity=.15,p.add(E),y.push(E)}s.current={rotation:new ke,edgeSegments:y};const C=B.attributes.position.array,v=new oe;v.setAttribute("position",new ve(C,3));const x=new Ie({color:65338,size:.01,transparent:!0,opacity:.6,blending:re}),R=new qe(v,x);p.add(R),f.current=R;const _=new Map,P=T.attributes.position.array;for(let l=0;l<P.length;l+=6){const $=`${P[l]},${P[l+1]},${P[l+2]}`,U=`${P[l+3]},${P[l+4]},${P[l+5]}`;_.has($)||_.set($,[]),_.has(U)||_.set(U,[]),_.get($).push([P[l+3],P[l+4],P[l+5]]),_.get(U).push([P[l],P[l+1],P[l+2]])}function I(){if(o.current=requestAnimationFrame(I),s.current){if(s.current.rotation.x+=1e-4,s.current.rotation.y+=9e-4,s.current.rotation.z+=.003,s.current.edgeSegments.forEach(u=>{u.rotation.copy(s.current.rotation)}),f.current.rotation.copy(s.current.rotation),w.current+=.016,w.current>7+Math.random()*3){const u=C.length/3,A=Math.floor(Math.random()*u)*3,E=[C[A],C[A+1],C[A+2]];n.current.forEach(O=>p.remove(O)),d.current.forEach(O=>p.remove(O)),n.current=[],d.current=[];const H=Math.random(),D=[new J(E[0],E[1],E[2])],Y=[`${E[0]},${E[1]},${E[2]}`];let k=E,Q=null;const Ce=50+Math.floor(Math.random()*20);for(let O=0;O<Ce;O++){const S=`${k[0]},${k[1]},${k[2]}`,N=_.get(S)||[];if(N.length===0)break;let z=N;if(Q){const W=`${Q[0]},${Q[1]},${Q[2]}`;z=N.filter(V=>`${V[0]},${V[1]},${V[2]}`!==W)}z.length===0&&(z=N);const F=z[Math.floor(Math.random()*z.length)];D.push(new J(F[0],F[1],F[2])),Y.push(`${F[0]},${F[1]},${F[2]}`),Q=k,k=F}const he={path:D,pathVertexKeys:Y,hue:H,startTime:Date.now(),duration:3.78,illuminatedNodes:[]},te=new Se({color:new L().setHSL(H,1,.7),transparent:!0,opacity:0,blending:re,linewidth:5}),K=new oe,X=new Me(K,te);X.userData=he,p.add(X),d.current.push(X),w.current=0}const l=Date.now();d.current.forEach(u=>{const A=(l-u.userData.startTime)/1e3,E=u.userData.duration||3.78;if(A>E+.3)p.remove(u);else if(A<=E){const H=Math.min(A/E,1),D=u.userData.path||[];if(u.userData.pathVertexKeys,D.length<2)return;let Y=0;const k=[];for(let S=0;S<D.length-1;S++){const N=D[S].distanceTo(D[S+1]);k.push(N),Y+=N}const Q=H*Y,he=Y*.4,te=Math.max(0,Q-he),K=[];let X=0;for(let S=0;S<D.length-1;S++){const N=X,z=X+k[S];if(z>=te&&N<=Q){const F=Math.max(0,(te-N)/k[S]),W=Math.min(1,(Q-N)/k[S]),V=D[S].clone().lerp(D[S+1],F),q=D[S].clone().lerp(D[S+1],W);(K.length===0||!K[K.length-1].equals(V))&&K.push(V),K.push(q)}X=z}const O=u.userData.illuminatedNodes||[];X=0;for(let S=0;S<k.length;S++)if(X+=k[S],te>X&&!O[S+1]){const N=D[S+1],z=new Te(.012,8,8),F=new xe({color:65338,transparent:!0,opacity:.5,blending:re}),W=new ue(z,F);if(W.position.copy(N),W.userData={createdAt:l},p.add(W),n.current.push(W),O[S+1]=W,S<D.length-1){const V=D[S],q=D[S+1],Be=`${V.x.toFixed(6)},${V.y.toFixed(6)},${V.z.toFixed(6)}`,Ae=`${q.x.toFixed(6)},${q.y.toFixed(6)},${q.z.toFixed(6)}`,Fe=[Be,Ae].sort().join("|");M.current.set(Fe,{hue:u.userData.hue,timestamp:l,intensity:1})}}if(te>0&&!O[0]){const S=D[0],N=new Te(.012,8,8),z=new xe({color:65338,transparent:!0,opacity:.7,blending:re}),F=new ue(N,z);F.position.copy(S),F.userData={createdAt:l},p.add(F),n.current.push(F),O[0]=F}if(u.userData.illuminatedNodes=O,K.length>1){u.geometry.setFromPoints(K);const S=Math.min(H*2,1);u.material.opacity=.9*S}else K.length===1&&u.geometry.setFromPoints([]);if(H>=.99&&s.current&&s.current.edgeSegments&&!u.userData.colorChanged&&(u.userData.colorChanged=!0,u.userData.flashStartTime=l,u.userData.targetHue=u.userData.hue),u.userData.colorChanged&&u.userData.flashStartTime&&s.current&&s.current.edgeSegments){const S=(l-u.userData.flashStartTime)/1e3;if(S<.02){const N=S/.06;let z;if(N<.01)z=N/.2;else{const q=(N-.2)/.7;z=Math.exp(-q*9)}const F=.6+.4*z,W=.35+.55*z,V=.2+.5*z;s.current.edgeSegments.forEach(q=>{q.material&&q.material.color&&(q.material.color.setHSL(u.userData.targetHue,F,W),q.material.opacity=V)})}else s.current.edgeSegments.forEach(N=>{N.material&&N.material.color&&(N.material.color.setHSL(u.userData.targetHue,.6,.35),N.material.opacity=.2)}),u.userData.flashStartTime=null}}else{const H=(A-E)/.5;u.material.opacity=.9*(1-H),H>=1&&u.geometry.setFromPoints([])}}),n.current.forEach(u=>{const A=(l-u.userData.createdAt)/100;if(A>4)p.remove(u);else{const E=Math.max(0,1-A/4);u.material.opacity=.9*E;const H=Math.sin(A*8)*.15+1;u.scale.setScalar(H)}}),n.current=n.current.filter(u=>u.parent),d.current=d.current.filter(u=>u.parent);const $=8e3,U=[];s.current.edgeSegments.forEach(u=>{const A=u.userData.edgeKey,E=M.current.get(A);if(E){const H=l-E.timestamp;if(H>$)u.material.color.setHex(u.userData.baseColor),u.material.opacity=u.userData.baseOpacity,U.push(A);else{const D=H/$,Y=new L().setHSL(E.hue,.8,.5),k=new L(u.userData.baseColor);u.material.color.copy(Y).lerp(k,D);const Q=.7;u.material.opacity=Q*(1-D)+u.userData.baseOpacity*D}}else u.material.color.setHex(u.userData.baseColor),u.material.opacity=u.userData.baseOpacity}),U.forEach(u=>M.current.delete(u))}m.render(p,g)}return I(),()=>{window.removeEventListener("resize",b),o.current&&cancelAnimationFrame(o.current),r.current&&e.current&&e.current.removeChild(r.current.domElement),n.current.forEach(l=>{l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose()}),d.current.forEach(l=>{l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose()}),s.current&&s.current.edgeSegments&&s.current.edgeSegments.forEach(l=>{l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose()}),B.dispose(),T.dispose(),v.dispose(),x.dispose(),m.dispose()}},[]),t.jsx("div",{ref:e,style:{width:"100%",height:"100%",position:"absolute",top:"-5%",left:"50%",transform:"translateX(-50%)",zIndex:1,pointerEvents:"none",maskImage:"linear-gradient(to bottom, white 0%, white 60%, transparent 90%)",WebkitMaskImage:"linear-gradient(to bottom, white 0%, white 60%, transparent 90%)"}})}function pt({isActive:h=!1}){const e=c.useRef(),a=c.useRef(),r=c.useRef(),i=c.useRef(),s=c.useRef(),o=c.useRef(),f=c.useRef(),n=c.useRef(0);return c.useEffect(()=>{if(!e.current)return;const d=new ye;a.current=d;const w=new $e(65,e.current.clientWidth/e.current.clientHeight,.1,1e3);w.position.z=4,i.current=w;const M=new be({alpha:!0,antialias:!0});M.setSize(e.current.clientWidth,e.current.clientHeight),M.setClearColor(0,0),e.current.appendChild(M.domElement),r.current=M;const p=()=>{if(!e.current)return;const x=e.current.clientWidth,R=e.current.clientHeight;w.aspect=x/R,w.updateProjectionMatrix(),M.setSize(x,R)};window.addEventListener("resize",p);const g=je(),m=new we(g),b=new ee({transparent:!0,opacity:.65,uniforms:{time:{value:0},color1:{value:new L(11141375)},color2:{value:new L(65535)},color3:{value:new L(16711850)},opacity:{value:.65}},vertexShader:`
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float opacity;
        varying vec3 vPosition;
        
        void main() {
          // Create flowing color based on position and time
          float wave = sin(vPosition.x * 2.0 + time) * 0.5 + 0.5;
          
          // Occasionally shift to third color (every ~10 seconds)
          float colorShift = sin(time * 0.15) * 0.5 + 0.5;
          vec3 baseColor = mix(color1, color2, wave);
          vec3 color = mix(baseColor, color3, colorShift * 0.3);
          
          gl_FragColor = vec4(color, opacity);
        }
      `}),B=new Re(m,b);d.add(B),s.current=B;const T=je({scale:.35}),j=new we(T),y=new ee({transparent:!0,uniforms:{time:{value:0},color1:{value:new L(16738047)},color2:{value:new L(14518527)},color3:{value:new L(16755455)},color4:{value:new L(6750207)},opacity:{value:.25}},vertexShader:`
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform float opacity;
        
        void main() {
          // Cycle through 4 colors: magenta → purple → pale pink → turquoise
          float phase = mod(time * 0.25, 4.0);
          vec3 color;
          
          if (phase < 1.0) {
            color = mix(color1, color2, phase);
          } else if (phase < 2.0) {
            color = mix(color2, color3, phase - 1.0);
          } else if (phase < 3.0) {
            color = mix(color3, color4, phase - 2.0);
          } else {
            color = mix(color4, color1, phase - 3.0);
          }
          
          gl_FragColor = vec4(color, opacity);
        }
      `}),C=new Re(j,y);d.add(C),o.current=C;function v(){if(f.current=requestAnimationFrame(v),n.current+=.016,s.current){s.current.rotation.x+=.003,s.current.rotation.y+=.005,s.current.rotation.z+=.002,s.current.material.uniforms&&(s.current.material.uniforms.time.value=n.current);const x=1+Math.sin(n.current*.5)*.05;s.current.scale.setScalar(x)}if(o.current){o.current.rotation.x-=.004,o.current.rotation.y-=.006,o.current.rotation.z+=.003;const x=1+Math.sin(n.current*.7+Math.PI)*.08;o.current.scale.setScalar(x),o.current.material.uniforms&&(o.current.material.uniforms.time.value=n.current)}M.render(d,w)}return v(),()=>{window.removeEventListener("resize",p),f.current&&cancelAnimationFrame(f.current),r.current&&e.current&&e.current.removeChild(r.current.domElement),g.dispose(),m.dispose(),b.dispose(),o.current&&(o.current.geometry.dispose(),o.current.material.dispose()),M.dispose()}},[]),c.useEffect(()=>{s.current&&s.current.material&&s.current.material.uniforms&&(s.current.material.uniforms.opacity.value=.1),o.current&&o.current.material&&o.current.material.uniforms&&(o.current.material.uniforms.opacity.value=.25)},[h]),t.jsx("div",{ref:e,style:{width:"100%",height:"100%",position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",zIndex:1,pointerEvents:"none"}})}function se(h){return h[Math.floor(Math.random()*h.length)]}function vt(){const[h,e]=c.useState(()=>se(fe)),[a,r]=c.useState(()=>se(de));c.useEffect(()=>{const s=()=>{e(se(fe)),r(se(de))};window.addEventListener("scroll",s),window.addEventListener("click",s);const o=setInterval(s,3e3);return()=>{window.removeEventListener("scroll",s),window.removeEventListener("click",s),clearInterval(o)}},[]);function i(){e(se(fe)),r(se(de))}return{portalState:h,glyphState:a,handleQuantumCollapse:i}}function gt(){const h=c.useRef(null),e=c.useRef(null),a=c.useRef(null),r=c.useRef(null),i=c.useRef(null),s=c.useRef(null),o=c.useRef(null),f=c.useRef(null);return c.useEffect(()=>{let n=0,d=0;const w=()=>{const p=window.scrollY,g=window.innerHeight,m=Math.min(p/g,1),b=Math.max(0,1-m*2);a.current&&(a.current.style.transform=`translate3d(${n*30*b}px, ${-p*.2+d*20*b}px, 0)`,a.current.style.opacity=String(1-m*.4)),r.current&&(r.current.style.transform=`translate3d(${n*40*b}px, ${-p*.3+d*25*b}px, 0)`,r.current.style.opacity=String(1-m*.3),r.current.style.filter=`blur(${m*2}px)`),i.current&&(i.current.style.transform=`translate3d(${n*50*b}px, ${-p*.4+d*30*b}px, 0)`,i.current.style.opacity=String(1-m*.35),i.current.style.filter=`blur(${m*1.5}px)`),s.current&&(s.current.style.transform=`translate3d(${n*60*b}px, ${-p*.5+d*35*b}px, 0)`,s.current.style.opacity=String(1-m*.4),s.current.style.filter=`blur(${m*1}px)`),o.current&&(o.current.style.transform=`translate3d(${n*70*b}px, ${-p*.6+d*38*b}px, 0)`,o.current.style.opacity=String(1-m*.45),o.current.style.filter=`blur(${m*.5}px)`),f.current&&(f.current.style.transform=`translate3d(${n*75*b}px, ${-p*.65+d*39*b}px, 0)`,f.current.style.opacity=String(1-m*.5)),e.current&&(e.current.style.transform=`translate3d(${n*80*b}px, ${-p*.18+d*40*b}px, 0)`,e.current.style.opacity=String(.9-m*.6)),document.querySelectorAll(".quantum-scene").forEach((y,C)=>{if(!y)return;const v=y.getBoundingClientRect(),x=v.top+v.height/2,R=g/2,_=x-R,P=Math.min(1,Math.abs(_)/(g/2)),I=C*100+m*200,l=1-P*.08,$=-(_/R)*1.5;C!==2&&C!==3?(y.style.transform=`
            perspective(1500px) 
            translateZ(${I}px) 
            scale(${l})
            rotateX(${$}deg)
          `,y.style.opacity=String(1-P*.3)):(y.style.transform="none",y.style.opacity="1")});const T=document.querySelector(".n3xus-title, .scramble-title");if(T){const y=300-p*.5,C=Math.max(0,1-m*2),v=1+m*.2;T.style.transform=`
          perspective(1000px)
          translateZ(${y}px)
          scale(${v})
          rotateY(${n*8}deg)
        `,T.style.textShadow=`
          0 0 ${20+m*40}px rgba(0, 255, 247, ${C}),
          0 0 ${40+m*80}px rgba(255, 0, 204, ${C*.7}),
          0 0 4px #fff
        `}const j=document.querySelector(".floating-code");if(j){j.style.zIndex="100",j.style.position="relative";const y=Math.max(.5,1-m*.5);j.style.textShadow=`
          0 0 30px rgba(0, 255, 247, ${y}),
          0 0 50px rgba(255, 0, 204, ${y*.8}),
          0 0 8px #fff
        `}},M=p=>{n=(p.clientX/window.innerWidth-.5)*2,d=(p.clientY/window.innerHeight-.5)*2};return window.addEventListener("scroll",w),window.addEventListener("mousemove",M),w(),()=>{window.removeEventListener("scroll",w),window.removeEventListener("mousemove",M)}},[]),{parallaxRef:h,fgRef:e,bgRef:a,layer1Ref:r,layer2Ref:i,layer3Ref:s,layer4Ref:o,layer5Ref:f}}function St(){const{isAuthenticated:h,logout:e,user:a}=Oe(),r=Ve(),{portalState:i,handleQuantumCollapse:s}=vt(),{parallaxRef:o,fgRef:f,bgRef:n}=gt(),[d,w]=c.useState(0),[M,p]=c.useState(!1),[g,m]=c.useState(!1),[b,B]=c.useState(!1);return c.useEffect(()=>{const T=()=>{if(!o.current)return;const j=o.current,y=Array.from(j.querySelectorAll(".quantum-scene"));let C=0;for(let R=0;R<y.length;R++){const _=y[R].getBoundingClientRect();if(_.top<=window.innerHeight*.33&&_.bottom>window.innerHeight*.33){C=R;break}}w(C);const v=document.querySelector("#probability .scene-description");if(v){const R=v.getBoundingClientRect();m(R.top<window.innerHeight/3)}const x=document.querySelector("#superposition");if(x){const R=x.getBoundingClientRect();B(R.top<window.innerHeight*.1)}};return window.addEventListener("scroll",T),T(),()=>window.removeEventListener("scroll",T)},[]),c.useEffect(()=>{const T=()=>{window.scrollY>50?p(!0):p(!1)};return window.addEventListener("scroll",T),T(),()=>window.removeEventListener("scroll",T)},[]),t.jsxs(t.Fragment,{children:[h&&t.jsx(Ge,{portalState:i,navScrolled:M,isAuthenticated:h,logout:e,user:a,currentPage:"home"}),t.jsx(ft,{portalState:i,bgRef:n,fgRef:f}),t.jsxs("div",{className:`${Z.parallaxContainer}${h?"":" no-nav"}`,id:"parallax-container",ref:o,children:[t.jsxs("section",{className:`quantum-scene reality-scene-section${d===0?" active":""}`,id:"reality","data-scene":"0",children:[t.jsx("div",{className:`${Z.bgReality} bg-reality-position`,"aria-hidden":"true"}),t.jsxs("div",{className:"scene-content scene-content-wrapper",children:[t.jsxs("div",{className:"particles particles-wrapper",children:[t.jsx("div",{className:"particle"}),t.jsx("div",{className:"particle"}),t.jsx("div",{className:"particle"}),t.jsx("div",{className:"particle"}),t.jsx("div",{className:"particle"}),t.jsx("div",{className:"particle"})]}),t.jsxs("div",{className:"terminal-header",children:[t.jsx("span",{className:"manifold-label",children:"φ-SPACE_MANIFOLD: 1.618033988749"}),t.jsx("span",{className:"timestamp",id:"timestamp"})]}),t.jsx("div",{className:"title-wrapper",children:t.jsxs("h1",{className:`quantum-title ${Z.quantumTitle} quantum-title-h1`,children:[t.jsx("span",{className:"title-word title-word-span","data-word":"N3XUS",children:t.jsx(et,{originalText:"N3XUS",finalText:"アトリエ",delay:3e3})}),t.jsx("br",{}),t.jsxs("span",{className:"title-word title-word-span","data-word":"GE0M",children:["GE",t.jsx("span",{className:"slashed-zero",children:"0"}),"M"]}),t.jsx("br",{}),t.jsxs("span",{className:"title-word title-word-span","data-word":"LVB",children:["L",t.jsx("span",{className:"title-inverted-v",children:"V"}),"B"]})]})}),t.jsx("p",{className:"quantum-subtitle",children:"I N T E R A C T I V E _ C O N S O L E _ A W A I T S"}),t.jsx("div",{className:"hero-stats hero-stats-centered",children:t.jsxs("div",{className:"stat-item",children:[t.jsx("span",{className:"stat-label",children:"QUANTUM STATE-"}),t.jsx("span",{className:"stat-value stat-value-dynamic","data-stat":"state",style:{"--stat-color":i.colors[0],"--stat-text-shadow":`0 0 8px ${i.colors[1]}, 0 0 2px ${i.colors[2]}`},children:i.label.toUpperCase()})]})}),h?t.jsx("div",{className:"button-wrapper-auth",children:t.jsx(me,{onClick:T=>{r("/geom-lab")},label:t.jsxs(t.Fragment,{children:["ENTER L",t.jsx("span",{style:{display:"inline-block",transform:"scaleY(-1)",verticalAlign:"baseline"},children:"V"}),"B"]}),className:"enter-geom-lab-hero-btn"})}):t.jsxs("div",{className:"button-wrapper-no-auth",children:[t.jsx(me,{onClick:T=>{r("/login")},label:t.jsxs(t.Fragment,{children:["LOGI",t.jsx("span",{className:"inverted-n-span",children:"N"})]})}),t.jsx(me,{onClick:T=>{r("/signup")},label:"SIGN UP",delayedString:!0})]}),t.jsx("div",{className:"reality-particles"})]})]}),t.jsxs("section",{className:`quantum-scene${d===1?" active":""}`,id:"probability","data-scene":"1",children:[t.jsx("div",{className:"scene-background bg-probability","aria-hidden":"true"}),t.jsxs("div",{className:"scene-content",children:[t.jsx("h2",{className:"scene-title",children:"PROBABILITY CLOUD"}),t.jsx("p",{className:`scene-description${g?" flipped":""}`,children:"Where code exists in superposition until observed"}),t.jsx("div",{className:"probability-waves"}),t.jsx("div",{className:"code-snippets",children:t.jsx(Ye,{})})]})]}),t.jsxs("section",{className:`quantum-scene${d===2?" active":""}`,id:"entanglement","data-scene":"2",children:[t.jsx("div",{className:"scene-background bg-entanglement","aria-hidden":"true"}),t.jsx(mt,{isActive:d===2}),t.jsxs("div",{className:"scene-content entanglement-scene-content",children:[t.jsx("div",{className:"entanglement-network"}),t.jsx("div",{className:"connected-nodes",children:t.jsx("div",{className:"quantum-bridge"})})]})]}),t.jsx(Je,{id:"superposition",isActive:d===3,backgroundClass:"bg-superposition",animation:t.jsx(pt,{isActive:d===3}),children:t.jsxs("div",{className:"superposition-scene-div",children:[t.jsx("h2",{className:"scene-title",children:"SUPERPOSITION STATE"}),t.jsx("p",{className:`scene-description${b?" disassemble":""}`,children:"All possibilities exist simultaneously"}),t.jsx("div",{className:"superposition-field"})]})})]}),t.jsx(Ze,{portalState:i,onQuantumCollapse:s})]})}export{St as default};
