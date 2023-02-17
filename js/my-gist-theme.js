// 구분자일때 글자색 기본으로 변경
const plkos = document.getElementsByClassName('pl-kos');
let plkosMatch = /[.;,:]/;
for(let pk of plkos)
    if(pk.innerHTML.match(plkosMatch))
        pk.style.color = '#abb2bf';

// 연산자나 객체의 속성일때 색상 변경
const plc1 = document.getElementsByClassName('pl-c1');
let plc1Match = /[!+*\/=\<>&|%-]/;
for(let pc of plc1){
    if(pc.innerHTML.match(plc1Match)){
        if(!pc.innerHTML.match(/[a-zA-Z0-9]-[a-zA-Z0-9]/))
            pc.style.color = '#56b6c2';
    }
    if(pc.previousSibling && pc.previousSibling.innerHTML == '.')
        pc.style.color = '#e06c75';
    
    // css 코드일땐 색상을 통일하기 위해서 글자색 기본으로 변경
    const plsmi = pc.querySelector('.pl-smi');
    if(plsmi){
        pc.style.color = '#abb2bf';
        plsmi.style.color = '#abb2bf';
    }
}

// js코드에서 bracket pair에 따라 color 변경하는 코드
let plkosBracketMatch = /[\[\](){}]/;
let colorPalette = ['#e6c07b', '#c678dd', '#61aeee'];
let colorCount = 0;
let stack = [];
const blobCode = document.getElementsByClassName('blob-code');
for(let bc of blobCode) {
    const plkosBracket = bc.getElementsByClassName('pl-kos');
    for(let pb of plkosBracket) {
        if(pb.innerHTML.match(plkosBracketMatch)){
            pb.style.color = colorPalette[colorCount];
            if(pb.innerHTML.match(/[\[({]/)){
                stack.push(pb.innerHTML);
                if(stack.includes('(') || stack.includes('['))
                    colorCount += 1;
            }
            else {
                stack.pop()
                if(colorCount != 0)
                    colorCount -= 1;
                else
                    colorCount = colorPalette.length - 1;
                pb.style.color = colorPalette[colorCount];
            }
        }
    }
    if(stack.length != 0){
        colorCount = stack.length;
        if(colorCount > 2)
            colorCount %= colorPalette.length;
    }
}

// console이나 System이 나올때 글자색 기본으로 변경
const plsmi = document.getElementsByClassName('pl-smi');
for(let ps of plsmi)
    if(ps.innerHTML == 'console' || ps.innerHTML == 'System')
        ps.style.color = '#abb2bf';

// css코드에서 hex값에 따라 글자색과 배경색을 변경
const plpds = document.getElementsByClassName('pl-pds');
for(let pp of plpds){
    const plkosInPp = pp.getElementsByClassName('pl-kos');
    let colorCode = pp.innerHTML.slice(-6);
    pp.style.background = '#' + colorCode;
    if(isLight(colorCode))
        pp.style.color = '#000';
    else
        pp.style.color = '#fff';
    for(let pkip of plkosInPp){
        pkip.style.background = '#' + colorCode;
        if(isLight(colorCode))
            pkip.style.color = '#000';
        else
            pkip.style.color = '#fff';
    } 
}

// 배경색에 따라 글자색을 밝게 할지 판단하는 함수
function isLight(colorCode){
    let rgb = parseInt(colorCode, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;
    let luma = 0.2627 * r + 0.6780 * g + 0.0593 * b; // per ITU-R BT.2020 (UHDTV 색공간 표준)
    if(luma < 128)
        return false;
    else
        return true;
}

