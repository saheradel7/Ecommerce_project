window.onload = function () {
  //clear local storage
  // localStorage.clear()

  if (localStorage.getItem('userName')) {
    document.getElementById("Is_Logined_Id").style.display = "block"
    document.getElementById("Is_Logined_Id").innerHTML = ((localStorage.getItem("userName")))
    document.getElementById("Register_Button").style.display = "none"
    document.getElementById("Login_Button").style.display = "none"
    document.getElementById("LgOut_Button").style.display = "block"



  }
  else {

    document.getElementById("Is_Logined_Id").style.display = "none"
    document.getElementById("LgOut_Button").style.display = "none"

    // localStorage.clear()

  }
  /////////////////////////////////////////////////////////////////////////
  fetch("https://project1-2d2e6-default-rtdb.firebaseio.com/.json")
    .then(response => {
      return response.json();

    })
    .then(data => {
      let Categories = data.Categories;
      let fireBaseIndes;
      for (let key in data.products) {
        if (data.products[key] != null) // when you delete the firebase set element with null
        {
          fireBaseIndes = key;

          createElement(data.products[key], fireBaseIndes)
        }
      }

    })
}


var counterProducts = 0;
function createElement(item, fireBaseIndex) {

  var Row_Container = document.getElementById("_Row")
  Row_Container.innerHTML += `<div class="col-xl-3 col-md-4 col-sm-6">
<div class="price_box">
  <img src="${item.url}" class="card-img-top" alt="NadalTheKingOfGame" width="100%" height="150px">
  <h3 class="text-primary">${item.name}</h3>
  <p class="center-block _Circle">
  ${item.sale}$
  </p>
  <ul class="list-unstyled">
    <li>${item.description.slice(0, 40)}</li>
    <li class="Amount">The amount available :: </li><span>${item.amount}</span>
  </ul>
  
  <button class="btn_Increasing btn btn-outline-success" name=${item.id} onclick="increasing(this)"><i class="fa-solid fa-caret-up"></i></button>
  <button class="btn_Decreasing btn btn-outline-danger" name=${item.id} onclick="decreasing(this)"><i class="fa-solid fa-caret-down"></i></button>
  <span class="Display_Icreasing_Decreasing" id="Display_Counter_For_Product">1</span>
  <button class="btn btn-primary Button_AddToCart_Index_page " name=${item.id} value=${item.id} onclick="setProducts(this)">
  AddToCart
  </button>
  <a class="card-link btn btn-outline-info" href="DetailsOfProduct.html?FireBaseIndexForId=${fireBaseIndex}&ActuallyProductId=${item.id}">Details</a>
</div>
</div>`
  /* <a href="${item.id}" class="btn btn-primary" value_id=${item.id} onclick="setProducts(this)">Order_Now</a> */

  showItemsNumberInCards()
}


function GetUsers() {
  fetch("https://project1-2d2e6-default-rtdb.firebaseio.com/.json")
    .then(response => {
      return response.json();

    })
    .then(data => {
      // let Categories = data.Categories;
      let fireBaseIndes;
      for (let key in data.Users) {
        if (data.Users[key] != null) // when you delete the firebase set element with null
        {
          // fireBaseIndes = key;

        }
      }

    })
}

GetUsers()
var ProductsCounter = document.getElementById("ProductsCounter")


let buttons = document.getElementsByClassName('Button_AddToCart_Index_page'); //list of buttons 




////////////////////////  SetProduct New Method With Increas and decrease ./////


 let Glogabl_Flage_Index=0
////function to set data in local storage
function setProducts(e) {
  var arrproducts = [];
  if(localStorage.Orders) {
    ////////////////////  products for an order  //////////////////
    arrproducts = (JSON.parse(localStorage.getItem("Orders")))
  }
 
  ////////////////////  products for an order  //////////////////
  arrproducts.push(parseInt(e.name))
  localStorage.setItem("Orders", JSON.stringify(arrproducts))

  //////////////////////// Counter Product ////////////////////////
  counterProducts = (JSON.parse(localStorage.getItem("Counter")))
  counterProducts++
  localStorage.setItem("Counter", JSON.stringify(counterProducts))
  ProductsCounter.innerHTML = counterProducts

  //////////////////////// Show Increment and Decrement Buttons ////////////////////////
  e.style.display="none";
  var span = e.previousElementSibling;
  var btn1 = span.previousElementSibling;
  var btn2 = btn1.previousElementSibling;
  // console.log(span)
  // console.log(btn1)
  // console.log(btn2)
  // console.log("The Length of Buttons",buttons.length)
  // document.getElementById("Button_Increasing_Decreasing").style.display="inline-block"
  flage_count = 0;
  for (var i = 0; i < arrproducts.length; i++) {
    if (arrproducts[i] == e.name) {
      flage_count++
    }

  }
  btn1.style.display="inline-block"
  btn2.style.display="inline-block"
  span.style.display="inline-block"
  span.innerHTML=flage_count


  // Inc_arrproducts=[]

  //////////////////////// Counter Product////////////////////////


  

}



//////////////////////  Set Product Old Method


/////////////////////////////////////////   select Option   //////////////////////////
fetch("https://project1-2d2e6-default-rtdb.firebaseio.com/Categories.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    let select = document.getElementById("Category");
    for (let key in data) {
      if (data[key] != null) {
        let option = document.createElement('option');

        option.setAttribute("value", data[key].id);// <option value='1'>  </option>
        option.textContent = data[key].name;// <option value='1'> clothes </option>
        select.appendChild(option)
      }

    }
  });

function Change(e) {
  let select = document.getElementById('Category');
  let option = select.options[select.selectedIndex];
  let categoryId = option.value;

  fetch("https://project1-2d2e6-default-rtdb.firebaseio.com/products.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      let Row_Container = document.getElementById("_Row").innerHTML = "";

      for (let key in data) {
        let fireBase = key
        if (data[key] != null && data[key].CategoryId == categoryId) {
          createElement(data[key], fireBase)
        }

      }
    });
}




function showItemsNumberInCards() {
  if (localStorage.getItem('Orders') !== null || localStorage.getItem('Counter') !== null) {
    //////////////////////// Counter Product////////////////////////
    counterProducts = (JSON.parse(localStorage.getItem("Counter")))
    ProductsCounter.innerHTML = counterProducts
  }
  else {
    //////////////////////// Counter Product////////////////////////
    ProductsCounter.innerHTML = ""
  }
}


function LogOut() {
  localStorage.clear()
  self.location.href = "Index.html"
}


////////////////////// button cart for decreasing and increasing ///////////
counter_m = 0
function decreasing(e) {
  var Dec_arrproducts = (JSON.parse(localStorage.getItem("Orders")))
  
  var span=e.nextElementSibling
  span.style.display='inline-block'
  /////////////////////////////////////////////////////

  for (var i = 0; i < Dec_arrproducts.length; i++) {
    if (Dec_arrproducts[i] == e.name){
      Dec_arrproducts.splice(i, 1)
      break;
    }
    
  }


  //////////////////////////////////////////////////////
  // arrproducts.push(parseInt(e.name))
  localStorage.setItem("Orders", JSON.stringify(Dec_arrproducts))
  // Dec_arrproducts=[]

  //////////////////////// Counter Product////////////////////////

  flage_count = 0;
  for (var i = 0; i < Dec_arrproducts.length; i++) {
    if (Dec_arrproducts[i] == e.name) {
      flage_count++
    }

  }
  if(flage_count!=0){
    console.log(flage_count)
    counterProducts = (JSON.parse(localStorage.getItem("Counter")))
    counterProducts--
    localStorage.setItem("Counter", JSON.stringify(counterProducts))
    ProductsCounter.innerHTML = counterProducts
    //document.getElementsByClassName("Display_Icreasing_Decreasing")[Glogabl_Flage_Index].innerHTML=flage_count ///e.name-1

    // document.getElementById("Display_Counter_For_Product").innerHTML=flage_count
    span.innerHTML=flage_count
  }
  else{
    span.innerHTML=0
  }



}




// var numbers = [14, 14, 16, 25];
// let Listbtn_Decreasing=document.getElementsByClassName("btn_Decreasing")
// let Listbtn_Increasing=document.getElementsByClassName("btn_Increasing")

// for(let ListInc=0;ListInc<List.length;ListInc++){
//   Listbtn_Increasing[ListInc].addEventListener("click",decreasing)

// }

// for(let ListDec=0;ListDec<List.length;ListDec++){
//   Listbtn_Decreasing[ListDec].addEventListener("click",increasing)

// }


function increasing(e) {
  var btn = e.nextElementSibling;
  var span=btn.nextElementSibling
  span.style.display='inline-block'
  // console.log(span)
  var Inc_arrproducts = (JSON.parse(localStorage.getItem("Orders")))
  Inc_arrproducts.push(parseInt(e.name))
  localStorage.setItem("Orders", JSON.stringify(Inc_arrproducts))
  // Inc_arrproducts=[]

  //////////////////////// Counter Product////////////////////////
  counterProducts = (JSON.parse(localStorage.getItem("Counter")))
  counterProducts++
  localStorage.setItem("Counter", JSON.stringify(counterProducts))
  ProductsCounter.innerHTML = counterProducts
  flage_count = 0;
  for (var i = 0; i < Inc_arrproducts.length; i++) {
    if (Inc_arrproducts[i] == e.name) {
      flage_count++
    }

  }

  //document.getElementsByClassName("Display_Icreasing_Decreasing")[Glogabl_Flage_Index].innerHTML=flage_count  ///e.name-1
  //console.log(flage_count)
  // document.getElementById("Display_Counter_For_Product").innerHTML=flage_count
  span.innerHTML=flage_count


}


var arrdeletedproducts = []

// ProductId array that carry items from local storage
//Orders key in local storage
var counterProducts = 0;
function DeleteOrderOfProduct(e, Item_To_Remove_it) {

  // var arlocal = JSON.parse(localStorage.getItem('reptiles'));
  // localStorage.setItem("reptiles", JSON.stringify(arlocal))
  if (localStorage.getItem('Orders')) {
    for (var i = ProductId.length - 1; i >= 0; i--) {
      if (ProductId[i] === Item_To_Remove_it) {
        ProductId.splice(i, 1);
      }
    }
    localStorage.setItem("Orders", JSON.stringify(ProductId))
    counterProducts = (JSON.parse(localStorage.getItem("Counter")))
    counterProducts--
    localStorage.setItem("Counter", JSON.stringify(counterProducts))
    location.reload()

  }
  else {
    return
  }
}

////////////////////////  Count Duplicated Numbers in an array ///////////////



