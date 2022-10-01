
const topHead = document.createElement("div")
topHead.setAttribute("class","topheadclass")
topHead.innerHTML=`<h2>Makeup Sample</h2>`
document.body.append(topHead)



var Search_div = document.createElement('div')
Search_div.innerHTML=`<nav class="navbar bg-light">
    <div class="container-fluid">
    <a class="navbar-brand">Makeups</a>
    <form class="d-flex" role="search">
    <input class="form-control me-2" id="txt" type="search" list = "Brand_Names" placeholder="Brand" aria-label="Brand ">
    <input class="form-control me-3" id="txt1" type="search" placeholder="Product type" aria-label="Product type">
    <button class="btn btn-outline-success"  type="button"  onclick =  "readdata();">Search</button>
  </form>
</div>
</nav>`
document.body.append(Search_div)



function createcard(product,i,mainDiv){
var Card_body_div = document.createElement('div')
Card_body_div.setAttribute('class','card_width card_body')
Card_body_div.innerHTML=`<div class="col"><div class="card">
                            <h3 class="card-title">${product.brand}</h3>
                            <img src="${product.image_link}"  class="card-img-top" >
                                <div class="card-body">
                                    <div class="para" height: 10px; ><h4 class="card-title_name"><b>${product.name}</b></h4></div>
                                    <h6 class="des">${product.price_sign}: ${product.price}</h6>
                                    <div class="para"><p class="card-text">${product.description}</p></div>
                                    <a href="${product.product_link}" class="btn btn-primary">GO to Product</a>
                                    <a href="${product.website_link}" class="btn btn-primary">Go to Product site</a>
                                </div>
                            </div></div>`
                        mainDiv.append(Card_body_div)
 }



async function readdata(){
    var main_body_div = document.createElement('div')
    main_body_div.setAttribute('class','container')
    document.body.append(main_body_div)
    try{
    let Brand_txt = document.getElementById('txt').value
    let Product_type_txt = document.getElementById('txt1').value
    console.log(Brand_txt,Product_type_txt)
    var linkUrl = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${Brand_txt}&product_type=${Product_type_txt}`)
    var resjson = await linkUrl.json();
    console.log(resjson)
    var brand = []
    var c=0
    var row_div;
    resjson.forEach((element,i) =>{
        if(c==0){
            row_div = document.createElement('div')
            row_div.setAttribute('class','row')
           }
        createcard(element,i,row_div)

        brand.push(element.brand)
        c++
        if(c<1000){
            // c=0
            main_body_div.append(row_div)
        }
    })

    }
    catch(error){
        console.log(error)
    }
}

async function readmaindata(){
    var main_body_div = document.createElement('div')
    main_body_div.setAttribute('class','container')
    document.body.append(main_body_div)
    try{
    var linkUrl = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`)
    var resjson = await linkUrl.json();
    console.log(resjson)
    var brand = []
    var c=0
    var row_div;
    resjson.forEach((element,i) =>{
        if(c==0){
            row_div = document.createElement('div')
            row_div.setAttribute('class','row')
           }
        createcard(element,i,row_div)

        brand.push(element.brand)
        c++
        if(c<1000){
            // c=0
            main_body_div.append(row_div)
        }
    })

    }
    catch(error){
        console.log(error)
    }
}
if(readmaindata()==0){
readdata();
}

// onclick="window.location.reload();