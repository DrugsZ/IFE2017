// // drag=(options)=>{
// //     let el = options.el;
// //     el.addEventListener('',(e)=>{
// //         console.log(e)
// //         let target = e.target;
// //         let width = target.off
// //     },false)
// // }
// let colorPanel = (function() {
//     let canvas = document.getElementById('panel');
//     let ctx = canvas.getContext('2d');

//     let lightGradient = ctx.createLinearGradient(0, 0, 0, 400); // 亮度渲染

//     lightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
//     lightGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

//     return {
//         render: function(color) { // 需要渲染两次
//             ctx.clearRect(0, 0, 400, 400) // 清除画布

//             let colorGradient = ctx.createLinearGradient(0, 0, 400, 0); // 颜色渲染

//             colorGradient.addColorStop(0, 'rgb(255, 255, 255)');
//             colorGradient.addColorStop(1, color);

//             ctx.fillStyle = colorGradient;
//             ctx.fillRect(0, 0, 400, 400);

//             ctx.fillStyle = lightGradient;
//             ctx.fillRect(0, 0, 400, 400);
//         }
//     }
// })();
// let parent =  document.querySelector('.container')
// let startPos,newPos,canMove = false,
// btnPosTop = 0,MIN= 0, MAX = 400
// document.querySelector('.dot').addEventListener('mousedown',(e)=>{
//     canMove = true
//     startPos = e.pageY
// })
// document.addEventListener('mouseup',(e)=>{
//     canMove = false
// })
// document.addEventListener('mousemove',(e)=>{
//     if(!canMove){
//         return
//     }
//     newPos = e.pageY - startPos;
//     startPos = e.pageY
//     let dot = document.querySelector('.dot')
//     let top = btnPosTop
//     btnPosTop = top + newPos;
//     if(btnPosTop>MAX||btnPosTop<MIN){
//         return
//     }
//     dot.style.top = btnPosTop+'px'
//     setBtnColor(btnPosTop)
// })
// setBtnColor=(num)=>{
//     let h = num/400
//     let s = 1
//     let l = .5
//     let rgbArr = hslToRgb(h, s, l)
//     console.log(rgbArr)
//     document.querySelector('.dot').style.background = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
//     colorPanel.render( `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`)
// }
// function hslToRgb(h, s, l) {
//     var r, g, b;

//     if(s == 0) {
//         r = g = b = l; // achromatic
//     } else {
//         var hue2rgb = function hue2rgb(p, q, t) {
//             if(t < 0) t += 1;
//             if(t > 1) t -= 1;
//             if(t < 1/6) return p + (q - p) * 6 * t;
//             if(t < 1/2) return q;
//             if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//             return p;
//         }

//         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         var p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1/3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1/3);
//     }

//     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }

class Drag {
    constructor(options) {
        this.CANDRAG_X = options.CANDRAG_X || true
        this.CANDRAG_Y = options.CANDRAG_Y || true
        this.MIN_X = options.MIN_X || 0
        this.MAX_X = options.MAX_X || document.querySelector('body').offsetHeight
        this.MIN_Y = options.MIN_Y || 0
        this.MAX_Y = options.MAX_Y || document.querySelector('body').offsetLeft
        this.canMove = true
        this.startPos = null
        this.newPos = null
        this.btnPosTop = 0
        this.$el = document.querySelector(options.el)
        if(!this.$el){
            console.error('请标明挂载DOM')
            return
        }
        this.init()
    }
    init(){
        this.$el.addEventListener('mousedown',(e)=>{
            this.canMove = true
            this.startPos = e.pageY
        })
        document.addEventListener('mouseup',(e)=>{
            this.canMove = false
        })
        document.addEventListener('mousemove',(e)=>{
            if(!this.canMove){
                return
            }
            this.newPos = e.pageY - this.startPos;
            this.startPos = e.pageY
            let top = this.btnPosTop + this.newPos;
            if(top>this.MAX_X||top<this.MIN_X){
                return
            }
            this.btnPosTop = top
            this.$el.style.top = this.btnPosTop+'px'
        })
    }
}