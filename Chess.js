let themeColor1 = 'rgb(238,238,210)';
let themeColor2 = 'rgb(181,136,99)';
let path = "Cartoon"
let board = []
let rows = ['row8', 'row7', 'row6', 'row5', 'row4', 'row3', 'row2', 'row1']
let moveNo = 1

window.addEventListener('load', () => {

    const p1name = sessionStorage.getItem('p1name');
    const p2name = sessionStorage.getItem('p2name');
    if(p1name){
        document.querySelector('.player1').innerHTML = p1name;    
    }
    else{
        document.querySelector('.player1').innerHTML = "PLAYER 1";    
    }
    if(p2name){
        document.querySelector('.player2').innerHTML = p2name;
    }
    else{
        document.querySelector('.player2').innerHTML = "PLAYER 2";
    }

})

const org_pos = {
    "b801": "Brook",
    "b802": "Bknight",
    "b803": "Bbishop",
    "b804": "Bqueen",
    "b805": "Bking",
    "b806": "Bbishop",
    "b807": "Bknight",
    "b808": "Brook",

    "b701": 'Bpawn',
    "b702": 'Bpawn',
    "b703": 'Bpawn',
    "b704": 'Bpawn',
    "b705": 'Bpawn',
    "b706": 'Bpawn',
    "b707": 'Bpawn',
    "b708": 'Bpawn',
    // 
    "b201": 'Wpawn',
    "b202": 'Wpawn',
    "b203": 'Wpawn',
    "b204": 'Wpawn',
    "b205": 'Wpawn',
    "b206": 'Wpawn',
    "b207": 'Wpawn',
    "b208": 'Wpawn',

    "b101": " Wrook",
    "b102": " Wknight",
    "b103": " Wbishop",
    "b104": " Wqueen",
    "b105": " Wking",
    "b106": " Wbishop",
    "b107": " Wknight",
    "b108": " Wrook",
}

const boardGen = () => {

    const mainBoard = document.querySelector('.mainBoard')


    for (let i = 8; i > 0; i--) {
        const rowArr = [];
        for (let j = 1; j < 9; j++) {
            const fileName = i + '0' + j;
            rowArr.push(fileName);
        }
        board.push(rowArr);
    }
    let t = 0;
    board.forEach(element => {
        let rank = document.createElement('div');
        rank.setAttribute('class', 'divv');
        rank.setAttribute('id', rows[t]);
        t = t + 1
        element.forEach(el => {
            let square = document.createElement('li')
            square.setAttribute('class', 'box')
            square.setAttribute('id', 'b' + el);
            rank.appendChild(square);
        })
        mainBoard.appendChild(rank);
    })
    for (const [key, value] of Object.entries(org_pos)) {
        document.querySelector('#' + key).innerHTML = value;
    }
}
boardGen();
let piecesLoc = document.querySelectorAll('.box');
var temp = []
for (let i = 0; i < piecesLoc.length; i++) {
    temp.push([piecesLoc[i].id, piecesLoc[i].innerHTML])
}


document.querySelectorAll('.theme').forEach(el => {
    el.addEventListener('click', () => {
        // To change the theme to blue
        if (el.id == "Blue") {
            themeColor1 = 'rgb(212,224,229)';
            themeColor2 = 'rgb(113,149,171)';
            coloring();
        }
        else if (el.id == "Wood") {
            themeColor1 = 'rgb(190,146,87)';
            themeColor2 = 'rgb(104,55,37)';
            coloring();
        }
        else if (el.id == "Grey") {
            themeColor1 = 'white'
            themeColor2 = 'rgb(153,153,153)'
            coloring();
        }
        else if (el.id == "Brown") {
            themeColor1 = 'rgb(238,238,210)';
            themeColor2 = 'rgb(181,136,99)';
            coloring();
        }
        else if (el.id == "Classic") {
            path = "Classic";
            insertImage();
        }
        else if (el.id == "Cartoon") {
            path = "Cartoon";
            insertImage();
        }
        else if (el.id == "Neon") {
            path = "Neon";
            insertImage();
        }
        else if (el.id == "Metal") {
            path = "Metal";
            insertImage();
        }
    })
})




// Inserting the Images
function insertImage() {

    document.querySelectorAll('.box').forEach(image => {
        // console.log(image)
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                let temp = 'Pieces/' + path + '/' + image.innerText + ".png";
                image.innerHTML = `${image.innerText} <img class='allimg allpawn ${image.innerText}' src="${temp}" alt="">`;
                image.style.cursor = 'pointer';
                image.firstElementChild.setAttribute('id', image.id)

            }

            else {
                let temp = 'Pieces/' + path + '/' + image.innerText + ".png";
                image.innerHTML = `${image.innerText} <img class='allimg ${image.innerText}' src="${temp}" alt="">`;
                image.style.cursor = 'pointer';
                image.firstElementChild.setAttribute('id', image.id)
            }
        }
    })
}
insertImage();

cellClass = () => {
    document.querySelectorAll('.box').forEach(el => {
        const pos = String.fromCharCode(96 + Number(el.id[3])) + el.id[1]
        el.classList.add(pos);
        if (el.firstElementChild) {
            el.firstElementChild.classList.add(pos)
        }
    })
}
cellClass();

//Coloring

function coloring() {
    const color = document.querySelectorAll('.box');

    color.forEach(color => {

        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup
        if (a % 2 == 0) {
            color.style.backgroundColor = themeColor2;
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = themeColor1;
        }

    })
}
coloring()




// To red the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'pink') {

            document.querySelectorAll('.box').forEach(i2 => {

                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {


                    greenText = i2.innerText

                    pinkText = i1.innerText

                    pinkColor = ((Array.from(pinkText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()

                    if (pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(253, 60, 60)'
                    }
                }
            })
        }
    })
}




tog = 1
Wk = 0
Wrr = 0
Wfr = 0
Bk = 0
Brr = 0
Bfr = 0

document.querySelectorAll('.box').forEach(item => {


    item.addEventListener('click', function () {
        // To delete the opposite element

        if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
            tog = tog + 1
        }

        else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {

            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'pink') {
                    pinkId = i.id
                    pinkText = i.innerText
                    cap = item.firstElementChild.cloneNode()
                    let p = i.firstElementChild.classList;
                    var classList = cap.classList;
                    while (classList.length > 0) {
                        classList.remove(classList.item(0));
                    }
                    cap.id = ""
                    cap.classList.add('capture')
                    if (tog % 2 !== 0) {
                        document.querySelector('.Wcap').appendChild(cap)
                    }
                    else {
                        document.querySelector('.Bcap').appendChild(cap)
                    }
                    document.getElementById(pinkId).innerText = ''
                    item.innerText = pinkText
                    if (item.innerText.includes('Wpawn') && i.id[1] == '7') {
                        let pro = prompt("Enter the piece name:- ex: queen, rook, bishiop, knight")
                        pawnPro(pro, 'W', item.id);

                    }
                    if (item.innerText.includes('Bpawn') && i.id[1] == '2') {
                        let pro = prompt("Enter the piece name:- ex: queen, rook, bishiop, knight")
                        pawnPro(pro, 'B', item.id);

                    }
                    coloring()
                    insertImage()
                    document.getElementById("moveAudio").play()
                    tog = tog + 1
                    if (item.innerHTML[0] == 'W') {
                        let m = document.createElement('div');
                        m.setAttribute('class', 'moves');
                        let m_no = document.createElement('div');
                        m_no.setAttribute('class', 'm_no');
                        m_no.classList.add('m_no' + moveNo)
                        let wm = document.createElement('div');
                        wm.setAttribute('class', 'wm')
                        wm.classList.add('wm' + moveNo)
                        let bm = document.createElement('div');
                        bm.setAttribute('class', 'bm')
                        bm.classList.add('bm' + moveNo)
                        m.appendChild(m_no)
                        m.appendChild(wm)
                        m.appendChild(bm)
                        if (moveNo % 2 == 0) {
                            m_no.backgroundColor = "rgb(43, 41, 39)";
                            wm.backgroundColor = "rgb(43, 41, 39)";
                            bm.backgroundColor = "rgb(43, 41, 39)";
                        }
                        document.querySelector('.move').appendChild(m);
                        document.querySelector('.m_no' + moveNo).innerHTML = moveNo + '.'
                        if (pawnP == moveNo) {
                            if (item.innerHTML[2] == 'n') {
                                document.querySelector('.wm' + moveNo).innerHTML = p.item(p.length - 1)[0] + " = " + 'N';
                            }
                            else {
                                document.querySelector('.wm' + moveNo).innerHTML = p.item(p.length - 1)[0] + " = " + item.innerHTML[1].toUpperCase();
                            }

                        }
                        else if (item.innerHTML[1] == 'p') {
                            document.querySelector('.wm' + moveNo).innerHTML = p.item(p.length - 1)[0] + 'x' + item.classList[1];
                        }
                        else if (item.innerHTML[2] == 'n') {

                            document.querySelector('.wm' + moveNo).innerHTML = 'N' + 'x' + item.classList[1];
                        }

                        else {
                            document.querySelector('.wm' + moveNo).innerHTML = item.innerHTML[1].toUpperCase() + 'x' + item.classList[1];
                        }
                        flip()
                        cellClass()

                    }
                    else {
                        if (pawnP == moveNo) {
                            if (item.innerHTML[2] == 'n') {
                                document.querySelector('.bm' + moveNo).innerHTML = p.item(p.length - 1)[0] + " = " + 'N';
                            }
                            else {
                                document.querySelector('.bm' + moveNo).innerHTML = p.item(p.length - 1)[0] + " = " + item.innerHTML[1].toUpperCase();
                            }

                        }
                        else if (item.innerHTML[1] == 'p') {
                            document.querySelector('.bm' + moveNo).innerHTML = p.item(p.length - 1)[0] + 'x' + item.classList[1];
                        }
                        else if (item.innerHTML[2] == 'n') {
                            document.querySelector('.bm' + moveNo).innerHTML = 'N' + 'x' + item.classList[1];
                        }

                        else {
                            document.querySelector('.bm' + moveNo).innerHTML = item.innerHTML[1].toUpperCase() + 'x' + item.classList[1];
                        }
                        moveNo++;
                        flip()

                    }
                    if (tog % 2 == 0) {
                        let t = document.querySelectorAll('.box');
                        for (let i = 0; i < 64; i++) {
                            t[i].id = f[i];
                            if (t[i].firstElementChild) {
                                t[i].firstElementChild.id = f[i];
                                let temp = t[i].firstElementChild.classList[t[i].firstElementChild.classList.length]
                                t[i].firstElementChild.classList.remove(temp);
                                t[i].firstElementChild.classList.add(f1[i])
                            }
                            let temp = t[i].classList[1]
                            t[i].classList.remove(temp)
                            t[i].classList.add(f1[i])
                        }
                    }
                    else {
                        let t = document.querySelectorAll('.box');
                        for (let i = 0; i < 64; i++) {
                            t[i].id = s[i];
                            if (t[i].firstElementChild) {
                                t[i].firstElementChild.id = s[i];
                                let temp = t[i].firstElementChild.classList[t[i].firstElementChild.classList.length]
                                t[i].firstElementChild.classList.remove(temp);
                                t[i].firstElementChild.classList.add(s1[i])
                            }
                            let temp = t[i].classList[1]
                            t[i].classList.remove(temp)
                            t[i].classList.add(s1[i])
                        }
                        for (let i = 0; i < 64; i++) {
                            t[i].classList[1] = s1[i]
                        }
                    }
                    check()
                }
            })
        }



        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup



        // Function to display the available paths for all pieces

        function whosTurn(toggle) {

            // PAWN

            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'pink';
                // White Pawn first move 2 squares
                if (tog % 2 !== 0 && aup == 200) {

                    if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                        document.getElementById(`b${a + 200}`).style.backgroundColor = 'green'
                    }

                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                    }

                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'

                    }
                }
                // White Pawn 1 sqaure
                else if (tog % 2 !== 0 && aup < 800) {

                    if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    }

                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                    }

                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'

                    }
                }


                // Black Pawn first move 2 sqaure
                if (tog % 2 == 0 && aup == 700) {

                    if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                        document.getElementById(`b${a - 200}`).style.backgroundColor = 'green'
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'

                    }
                }
                // Black Pawn 1 square
                else if (tog % 2 == 0 && aup > 100) {

                    if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'

                    }
                }
            }

            // KING

            if (item.innerText == `${toggle}king`) {

                // Right
                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'

                }
                // Left
                if (aside > 1) {

                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
                }
                // Top
                if (aup < 800) {

                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                }
                // Bottom
                if (aup > 100) {

                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                }
                // Bottom Right
                if (aup > 100 && aside < 8) {

                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                }
                // Bottom Left
                if (aup > 100 && aside > 1) {

                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
                }
                // Top Right
                if (aup < 800 && aside < 8) {

                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                }
                // Top Left
                if (aup < 800 && aside > 1) {

                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
                }
                if (item.id == 'b105' && document.getElementById('b106').innerText == '' && document.getElementById('b107').innerText == '' && Wk == 0 && Wrr == 0 && document.getElementById('b108').innerText.includes('Wrook')) {
                    document.getElementById('b107').style.backgroundColor = 'green';
                }
                if (item.id == 'b105' && document.getElementById('b102').innerText == '' && document.getElementById('b103').innerText == '' && document.getElementById('b104').innerText == '' && Wk == 0 && Wfr == 0 && document.getElementById('b101').innerText.includes('Wrook')) {
                    document.getElementById('b103').style.backgroundColor = 'green';
                }
                if (item.id == 'b805' && document.getElementById('b806').innerText == '' && document.getElementById('b807').innerText == '' && Bk == 0 && Brr == 0 && document.getElementById('b808').innerText.includes('Brook')) {
                    document.getElementById('b807').style.backgroundColor = 'green';
                }
                if (item.id == 'b805' && document.getElementById('b802').innerText == '' && document.getElementById('b803').innerText == '' && document.getElementById('b804').innerText == '' && Bk == 0 && Bfr == 0 && document.getElementById('b801').innerText.includes('Brook')) {
                    document.getElementById('b803').style.backgroundColor = 'green';
                }


                item.style.backgroundColor = 'pink'

            }


            // ROOK

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                item.style.backgroundColor = 'pink'
            }



            // BISHOP

            if (item.innerText == `${toggle}bishop`) {


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                item.style.backgroundColor = 'pink'

            }



            // QUEEN

            if (item.innerText == `${toggle}queen`) {

                // Top
                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                // Bottom
                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }


                // Right
                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                // Left
                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                // Top Right
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                // Bottom-Right
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                // Top-Left
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                // Bottom-Left
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                item.style.backgroundColor = 'pink'

            }

            // KNIGHT

            if (item.innerText == `${toggle}knight`) {


                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green'
                }

                item.style.backgroundColor = 'pink'

            }
        }

        // Toggling the turn

        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }


        reddish()

        // winning()

        const win = (l) => {
            numOfKings = 0


            document.querySelectorAll('.box').forEach(w => {
                if (w.innerText.includes('Wking') || w.innerText.includes('Bking')) {
                    numOfKings += 1
                }

            })
            if(l == 1){
                numOfKings = 1;
            }
            if (numOfKings == 1) {
                document.getElementById("winAudio").play()
                setTimeout(() => {
                    // console.log(`${toggle}`) 
                    if (tog % 2 == 0) {
                        alert('White Wins !!')
                        location.reload()
                    }
                    else if (tog % 2 !== 0) {
                        alert('Black Wins !!')
                        location.reload()
                    }
                }, 100)
            }
        }
        win();

    })

})

let pawnP = 0
// Pawn promotion
const pawnPro = (p, t, i) => {
    if (p == 'queen' || p == 'rook' || p == 'bishop' || p == 'knight') {
        document.getElementById(i).innerText = t + p;
        pawnP = moveNo;
    }
    else {
        let p = prompt("Enter the piece name:- ex: queen, rook, bishiop, knight")
        pawnPro(p, t, i);
    }
}


castle = 0
// Moving the element
document.querySelectorAll('.box').forEach(hathiTest => {

    hathiTest.addEventListener('click', function () {

        if (hathiTest.style.backgroundColor == 'pink') {

            pinkId = hathiTest.id
            pinkText = hathiTest.innerText
            document.querySelectorAll('.box').forEach(hathiTest2 => {

                hathiTest2.addEventListener('click', function () {
                    if (hathiTest2.style.backgroundColor == 'green' && hathiTest2.innerText.length == 0) {

                        document.getElementById(pinkId).innerText = '';
                        hathiTest2.innerText = pinkText
                        let temp = String(hathiTest2.innerHTML).slice(0, 5)
                        if (temp == 'Wpawn' && hathiTest2.id[1] == '8') {
                            let pro = prompt("Enter the piece name:- ex: queen, rook, bishiop, knight")
                            pawnPro(pro, 'W', hathiTest2.id);
                            document.getElementById(pinkId).innerText = '';
                        }
                        else if (temp == 'Bpawn' && hathiTest2.id[1] == '1') {
                            let pro = prompt("Enter the piece name:- ex: queen, rook, bishiop, knight")
                            pawnPro(pro, 'B', hathiTest2.id);
                            document.getElementById(pinkId).innerText = '';
                        }
                        else {
                            document.getElementById(pinkId).innerText = '';
                            hathiTest2.innerText = pinkText
                        }
                        if (hathiTest2.innerHTML == 'Wking' && Wk == 0 && Wrr == 0 && hathiTest2.style.backgroundColor == 'green') {
                            if (hathiTest2.id == 'b107' && document.getElementById('b108').innerText.includes('Wrook')) {
                                document.getElementById('b107').innerText = 'Wking';
                                document.getElementById('b106').innerText = 'Wrook';
                                document.getElementById('b105').innerText = '';
                                document.getElementById('b108').innerText = '';
                                castle = moveNo;
                            }
                            else if (hathiTest2.id == 'b103' && document.getElementById('b101').innerText.includes('Wrook')) {
                                document.getElementById('b103').innerText = 'Wking';
                                document.getElementById('b104').innerText = 'Wrook';
                                document.getElementById('b105').innerText = '';
                                document.getElementById('b101').innerText = '';
                                castle = moveNo;
                            }
                        }
                        if (hathiTest2.innerHTML == 'Bking' && Bk == 0 && Brr == 0 && hathiTest2.style.backgroundColor == 'green') {
                            if (hathiTest2.id == 'b807' && document.getElementById('b808').innerText.includes('Brook')) {
                                document.getElementById('b807').innerText = 'Bking';
                                document.getElementById('b806').innerText = 'Brook';
                                document.getElementById('b805').innerText = '';
                                document.getElementById('b808').innerText = '';
                                castle = moveNo;
                            }
                            else if (hathiTest2.id == 'b803' && document.getElementById('b801').innerText.includes('Brook')) {
                                document.getElementById('b803').innerText = 'Bking';
                                document.getElementById('b804').innerText = 'Brook';
                                document.getElementById('b805').innerText = '';
                                document.getElementById('b801').innerText = '';
                                castle = moveNo;
                            }
                        }
                        if (hathiTest2.innerText.includes('Wking')) {
                            Wk = 1
                        }
                        if (hathiTest2.innerText.includes('Wrook')) {
                            if (Number(hathiTest2.id.slice(1,)) > 105) {
                                Wrr = 1
                            }
                            else {
                                Wfr = 1
                            }
                        }
                        if (hathiTest2.innerText.includes('Bking')) {
                            Bk = 1
                        }
                        if (hathiTest2.innerText.includes('Brook')) {
                            if (Number(hathiTest2.id.slice(1,)) > 805) {
                                Brr = 1
                            }
                            else {
                                Bfr = 1
                            }
                        }
                        coloring()
                        insertImage()
                        // check();
                        document.getElementById("moveAudio").play()

                        if (hathiTest2.innerHTML[0] == 'W') {
                            let m = document.createElement('div');
                            m.setAttribute('class', 'moves');
                            let m_no = document.createElement('div');
                            m_no.setAttribute('class', 'm_no');
                            m_no.classList.add('m_no' + moveNo)
                            let wm = document.createElement('div');
                            wm.setAttribute('class', 'wm')
                            wm.classList.add('wm' + moveNo)
                            let bm = document.createElement('div');
                            bm.setAttribute('class', 'bm')
                            bm.classList.add('bm' + moveNo)
                            m.appendChild(m_no)
                            m.appendChild(wm)
                            m.appendChild(bm)
                            document.querySelector('.move').appendChild(m);
                            document.querySelector('.m_no' + moveNo).innerHTML = moveNo + '.'
                            if (pawnP == moveNo) {
                                if (hathiTest2.innerHTML[2] == 'n') {
                                    document.querySelector('.wm' + moveNo).innerHTML = hathiTest2.classList[1][0] + " = " + 'N';
                                }
                                else {
                                    document.querySelector('.wm' + moveNo).innerHTML = hathiTest2.classList[1][0] + " = " + hathiTest2.innerHTML[1].toUpperCase();
                                }
                            }
                            else if (hathiTest2.innerHTML[1] == 'p') {
                                document.querySelector('.wm' + moveNo).innerHTML = hathiTest2.classList[1];
                            }
                            else if (hathiTest2.innerHTML[2] == 'n') {
                                document.querySelector('.wm' + moveNo).innerHTML = 'N' + hathiTest2.classList[1];
                            }
                            else if (hathiTest2.innerHTML.slice(1, 5) == 'king' && castle == moveNo) {
                                if (hathiTest2.id[3] > 5) {
                                    document.querySelector('.wm' + moveNo).innerHTML = "O-O";
                                }
                                else {
                                    document.querySelector('.wm' + moveNo).innerHTML = "O-O-O";
                                }
                            }

                            else {
                                document.querySelector('.wm' + moveNo).innerHTML = hathiTest2.innerHTML[1].toUpperCase() + hathiTest2.classList[1];
                            }
                            flip()
                        }
                        else {
                            if (pawnP == moveNo) {
                                if (hathiTest2.innerHTML[2] == 'n') {
                                    document.querySelector('.bm' + moveNo).innerHTML = hathiTest2.classList[1][0] + " = " + 'N';
                                }
                                else {
                                    document.querySelector('.bm' + moveNo).innerHTML = hathiTest2.classList[1][0] + " = " + hathiTest2.innerHTML[1].toUpperCase();
                                }
                            }
                            else if (hathiTest2.innerHTML[1] == 'p') {
                                document.querySelector('.bm' + moveNo).innerHTML = hathiTest2.classList[1];
                            }
                            else if (hathiTest2.innerHTML[2] == 'n') {
                                document.querySelector('.bm' + moveNo).innerHTML = 'N' + hathiTest2.classList[1];
                            }
                            else if (hathiTest2.innerHTML.slice(1, 5) == 'king' && castle == moveNo) {
                                if (hathiTest2.id[3] > 5) {
                                    document.querySelector('.bm' + moveNo).innerHTML = "O-O";
                                }
                                else {
                                    document.querySelector('.bm' + moveNo).innerHTML = "O-O-O";
                                }
                            }
                            else {
                                document.querySelector('.bm' + moveNo).innerHTML = hathiTest2.innerHTML[1].toUpperCase() + hathiTest2.classList[1];
                            }
                            moveNo++;
                            flip();

                        }
                        if (tog % 2 == 0) {
                            let t = document.querySelectorAll('.box');
                            for (let i = 0; i < 64; i++) {
                                t[i].id = f[i];
                                if (t[i].firstElementChild) {
                                    t[i].firstElementChild.id = f[i];
                                    let temp = t[i].firstElementChild.classList[t[i].firstElementChild.classList.length]
                                    t[i].firstElementChild.classList.remove(temp);
                                    t[i].firstElementChild.classList.add(f1[i])
                                }
                                let temp = t[i].classList[1]
                                t[i].classList.remove(temp)
                                t[i].classList.add(f1[i])
                            }
                        }
                        else {
                            let t = document.querySelectorAll('.box');
                            for (let i = 0; i < 64; i++) {
                                t[i].id = s[i];
                                if (t[i].firstElementChild) {
                                    t[i].firstElementChild.id = s[i];
                                    let temp = t[i].firstElementChild.classList[t[i].firstElementChild.classList.length]
                                    t[i].firstElementChild.classList.remove(temp);
                                    t[i].firstElementChild.classList.add(s1[i])
                                }
                                let temp = t[i].classList[1]
                                t[i].classList.remove(temp)
                                t[i].classList.add(s1[i])
                            }
                        }
                        check()
                        if (tog % 2 == 0) {

                            clearInterval(b)
                            var w = setInterval(temp2, 1000)
                        }
                        else {
                            clearInterval(w)
                            var b = setInterval(temp1, 1000);
                        }
                    }
                })
            })

        }

    })

})


f = ['b108', 'b107', 'b106', 'b105', 'b104', 'b103', 'b102', 'b101',
    'b208', 'b207', 'b206', 'b205', 'b204', 'b203', 'b202', 'b201',
    'b308', 'b307', 'b306', 'b305', 'b304', 'b303', 'b302', 'b301',
    'b408', 'b407', 'b406', 'b405', 'b404', 'b403', 'b402', 'b401',
    'b508', 'b507', 'b506', 'b505', 'b504', 'b503', 'b502', 'b501',
    'b608', 'b607', 'b606', 'b605', 'b604', 'b603', 'b602', 'b601',
    'b708', 'b707', 'b706', 'b705', 'b704', 'b703', 'b702', 'b701',
    'b808', 'b807', 'b806', 'b805', 'b804', 'b803', 'b802', 'b801'

]
s = ['b801', 'b802', 'b803', 'b804', 'b805', 'b806', 'b807', 'b808',
    'b701', 'b702', 'b703', 'b704', 'b705', 'b706', 'b707', 'b708',
    'b601', 'b602', 'b603', 'b604', 'b605', 'b606', 'b607', 'b608',
    'b501', 'b502', 'b503', 'b504', 'b505', 'b506', 'b507', 'b508',
    'b401', 'b402', 'b403', 'b404', 'b405', 'b406', 'b407', 'b408',
    'b301', 'b302', 'b303', 'b304', 'b305', 'b306', 'b307', 'b308',
    'b201', 'b202', 'b203', 'b204', 'b205', 'b206', 'b207', 'b208',
    'b101', 'b102', 'b103', 'b104', 'b105', 'b106', 'b107', 'b108'

]
f1 = ['h1', 'g1', 'f1', 'e1', 'd1', 'c1', 'b1', 'a1',
    'h2', 'g2', 'f2', 'e2', 'd2', 'c2', 'b2', 'a2',
    'h3', 'g3', 'f3', 'e3', 'd3', 'c3', 'b3', 'a3',
    'h4', 'g4', 'f4', 'e4', 'd4', 'c4', 'b4', 'a4',
    'h5', 'g5', 'f5', 'e5', 'd5', 'c5', 'b5', 'a5',
    'h6', 'g6', 'f6', 'e6', 'd6', 'c6', 'b6', 'a6',
    'h7', 'g7', 'f7', 'e7', 'd7', 'c7', 'b7', 'a7',
    'h8', 'g8', 'f8', 'e8', 'd8', 'c8', 'b8', 'a8']
s1 = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'

]
flip = () => {
    var items1 = Array.prototype.slice.call(document.querySelectorAll('.box'));
    var items2 = Array.prototype.slice.call(document.querySelectorAll('.box'));
    for (let i = 0, j = 63; i < 64; i++, j--) {
        items2[i] = items1[j]
    }
    var items3 = []

    for (let i = 0; i < 32; i++) {
        items3.push(document.getElementById(items1[i].id).innerHTML)
        document.getElementById(items1[i].id).innerText = document.getElementById(items2[i].id).innerText
        insertImage()
        coloring()
    }
    items3 = items3.reverse()
    for (let i = 0, j = 32; i < 32; i++, j++) {
        document.getElementById(items1[j].id).innerText = items3[i].split(" ")[0]
        insertImage()
        coloring()
    }
}

// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
            coloring()
        }
    })
})

