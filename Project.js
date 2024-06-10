//home slide
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("home_slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";

  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); 
}



// ========== * ========== //



//carousel
document.addEventListener("DOMContentLoaded", function() {
  initCarousels();
});

function initCarousels() {
  let boxSp1s = document.querySelectorAll('.box-sp1');

  boxSp1s.forEach(function(boxSp1) {
    let carousel = boxSp1.querySelector('.carousel ul');
    let leftBtn = boxSp1.querySelector('.btn-sp1-prev');
    let rightBtn = boxSp1.querySelector('.btn-sp1-next');
    let items = carousel.querySelectorAll('li');
    let itemWidth = items[0].getBoundingClientRect().width;
    let index = 0;
    let totalItems = items.length;
    let itemsPerPage = 4; // Số lượng mục trên mỗi trang, bạn có thể điều chỉnh tùy thuộc vào thiết kế của bạn

    function updateCarousel() {
      carousel.style.transform = 'translateX(-' + index * (itemWidth + 50) + 'px)';
    }

    leftBtn.addEventListener('click', function() {
      if (index > 0) {
        index--;
        updateCarousel();
      }
    });

    rightBtn.addEventListener('click', function() {
      if (index < totalItems - itemsPerPage) {
        index++;
        updateCarousel();
      }
    });

    window.addEventListener('resize', function() {
      itemWidth = items[0].getBoundingClientRect().width;
      updateCarousel();
    });

    updateCarousel();
  });
}



// ========== * ========== //



//scroll
let mybutton = document.querySelector(".scroll-to-top");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";

  }
}
function topFunction() {
  document.documentElement.scrollTop = 0;
}
scrollFunction();



// ========== * ========== //



var gioHang = JSON.parse(sessionStorage.getItem('gioHang')) || [];

// Ẩn phần tử showcart ban đầu
document.querySelector(".showcart").style.display = "none";

function themVaoGioHang(x) {
  let boxsp = x.parentElement.parentElement.children;
  let hinh = boxsp[0].children[0].src;
  let tensp = boxsp[1].innerText;
  let gia = boxsp[2].children[1].innerText;
  let selectedSizeItems = document.querySelectorAll('.size-option.selected');

  selectedSizeItems.forEach(selectedSizeItem => {
    let size = selectedSizeItem ? selectedSizeItem.getAttribute('data-size') : null;
    let quantityInput = selectedSizeItem ? selectedSizeItem.closest('.size-item').querySelector('.quantity-input').value : 0;

    if (size && quantityInput > 0) {
      let found = false;
      for (let i = 0; i < gioHang.length; i++) {
        if (gioHang[i].hinhSP === hinh && gioHang[i].tenSP === tensp && gioHang[i].giaSP === gia && gioHang[i].sizeSP === size) {
          gioHang[i].SLSP += parseInt(quantityInput);
          found = true;
          break;
        }
      }

      if (!found) {
        var sp = {
          hinhSP: hinh,
          tenSP: tensp,
          giaSP: gia,
          SLSP: parseInt(quantityInput),
          sizeSP: size,
        };
        gioHang.push(sp);
      }
    }
  });

  const loggedInUser = sessionStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    window.location.href = "Acount.html";
  } else {
    sessionStorage.setItem('gioHang', JSON.stringify(gioHang));
    console.log('Product added to cart:', gioHang);
    updateCartIcon();
  }
}

function updateCartIcon() {
  let cartIcon = document.querySelector(".svg-cart");
  if (gioHang.length > 0) {
    cartIcon.classList.add("btn-cart");
  } else {
    cartIcon.classList.remove("btn-cart");
  }
}

function showCart() {
  let x = document.querySelector(".showcart");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  showmycart();
}

function showmycart() {
  var ttgh = "";
  var tong = 0;
  for (let i = 0; i < gioHang.length; i++) {
    var tt = parseInt(gioHang[i].giaSP.replace(/[^\d]/g, '')) * gioHang[i].SLSP;
    tong += tt;
    ttgh += '<tr>' +
      '<td id="stt">' + (i + 1) + '</td>' +
      '<td id="hinh"><img src="' + gioHang[i].hinhSP + '" alt=""></td>' +
      '<td id="tenSP">' + gioHang[i].tenSP + '</td>' +
      '<td id="donGia">' + gioHang[i].giaSP + '</td>' +
      '<td id="sizeSP">' + gioHang[i].sizeSP + '</td>' +
      '<td id="slsp"><input id="countSP' + i + '" type="number" name="soluong" min="1" max="10" value="' + gioHang[i].SLSP + '" onchange="updateQuantity(' + i + ')"></td>' +
      '<td id="giaSP">' +
      '<div id="giaSP">' + tt + ' đ</div>' +
      '</td>' +
      '<td id="xoaSP"><button id="xoaSP_btn" onclick="xoaSanPham(' + i + ')">Xóa</button></td>' +
      '</tr>';
  }

  document.getElementById("mycart").innerHTML = ttgh;
  document.getElementById("tongDonHang").innerText = tong + ' đ';
}

function updateQuantity(index) {
  let newQuantity = document.getElementById('countSP' + index).value;
  gioHang[index].SLSP = parseInt(newQuantity);
  sessionStorage.setItem('gioHang', JSON.stringify(gioHang)); // Cập nhật sessionStorage
  showmycart();
  updateCartIcon();
}

function xoaSanPham(index) {
  gioHang.splice(index, 1);
  sessionStorage.setItem('gioHang', JSON.stringify(gioHang)); // Cập nhật sessionStorage
  showmycart();
  updateCartIcon();
}



// Xử lý sự kiện chọn size và số lượng
document.addEventListener("DOMContentLoaded", function() {
  const sizeOptions = document.querySelectorAll('.size-option.available');

  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      this.classList.toggle('selected');
      const sizeItem = this.closest('.size-item');
      const quantityInput = sizeItem.querySelector('.quantity-input');

      if (this.classList.contains('selected')) {
        quantityInput.disabled = false;
        quantityInput.value = 1; // Giá trị mặc định khi được chọn
      } else {
        quantityInput.disabled = true;
        quantityInput.value = 0; // Đặt lại giá trị khi bỏ chọn
      }
    });
  });
});



function addProductToCart(product) {
  // Lấy giỏ hàng từ sessionStorage, hoặc tạo một giỏ hàng mới nếu chưa tồn tại
  let cart = sessionStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];

  // Tìm sản phẩm có trong giỏ hàng
  const existingProductIndex = cart.findIndex(p => p.name === product.name);

  // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
  if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
  } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng là 1
      cart.push({ ...product, quantity: 1 });
  }

  // Lưu giỏ hàng đã cập nhật vào sessionStorage
  sessionStorage.setItem('cart', JSON.stringify(cart));

  // Cập nhật hiển thị giỏ hàng sau khi thêm sản phẩm
  updateCartDisplay();
}



// ========== * ========== //



//signUP
function signUP(event) {
  event.preventDefault();

  let username = document.getElementById("usernamenew").value;
  let email = document.getElementById("emailnew").value;
  let password = document.getElementById("passwordnew").value;
  let confirmpassword = document.getElementById("confirmpasswordnew").value;

  // Kiểm tra mật khẩu và xác nhận mật khẩu
  if (password !== confirmpassword) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp.");
    return;
  }

  let user = {
    username: username,
    email: email,
    password: password,
  };

  var json = JSON.stringify(user);
  localStorage.setItem(username, json);
  alert("Đăng ký thành công");
}



// ========== * ========== //



//logIN
function logIN(event){
event.preventDefault();

let username = document.getElementById("username").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

// Lấy dữ liệu người dùng từ localStorage
let user = localStorage.getItem(username);

console.log(user)

if(user === null){
    alert("Vui lòng nhập tên người dùng và mật khẩu.");
} else {
    let data = JSON.parse(user);

    // Kiểm tra thông tin đăng nhập
    if(username === data.username && email === data.email && password === data.password){
        alert("Đăng nhập thành công");
        sessionStorage.setItem('loggedInUser', username); // Lưu trạng thái đăng nhập
        checkLoginStatus(); // Cập nhật giao diện sau khi đăng nhập
        window.location.href="PersonalInfo.html"; // Chuyển hướng đến trang Item.html
    } else {
        alert("Đăng nhập thất bại");
    }
}
}


function checkLoginStatus() {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) {
      const loginDiv = document.getElementById("loginDiv");
      if (loginDiv) {
        loginDiv.innerHTML = '<a href="javascript:void(0)" onclick="logout()"><svg style="margin: 5px;" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/></svg></a>';
      }
    }
}

// Kiểm tra trạng thái đăng nhập khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
checkLoginStatus();
});

// Hàm đăng xuất
function logout() {
sessionStorage.removeItem('loggedInUser');
window.location.href = "Project.html"; // Chuyển hướng về trang đăng nhập
checkLoginStatus();
}








// ========== * ========== //



//search
function search_product(event) {
  event.preventDefault(); 

  let input = document.getElementById('searchbar').value.toLowerCase();

  let products = document.getElementsByClassName('product'); 

  var kq = "";
  for (let i = 0; i < products.length; i++) {
      let productName = products[i].getElementsByClassName('name-sp1-1')[0].innerText.toLowerCase();
      if (productName.includes(input)) {
        kq += '<div>' + productName + '</div>'
        console.log(kq);
      } 
      document.getElementById('searchResult').innerHTML = kq;
  }  
}

document.getElementById("show_searchResult").style.display = "none";

function showsearchresult() {
    let x = document.getElementById("show_searchResult");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}



// ========== * ========== //



//picture
document.addEventListener("DOMContentLoaded", function() {
  let mainImage = document.getElementById('main-image');
  let thumbnails = document.querySelectorAll('.thumbnail');
  let fullscreenOverlay = document.getElementById('fullscreen-overlay');
  let fullscreenImage = document.getElementById('fullscreen-image');

  thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
          let tempSrc = mainImage.src;
          mainImage.src = this.src;
          this.src = tempSrc;
      });
  });

  mainImage.addEventListener('click', function() {
      fullscreenImage.src = this.src;
      fullscreenOverlay.classList.add('active');
  });

  fullscreenOverlay.addEventListener('click', function() {
      this.classList.remove('active');
  });
});



// ========== * ========== //



//chatbox
function moForm() {
  document.getElementById("myForm").style.display = "block";
}
/*Hàm Đóng Form*/
function dongForm() {
  document.getElementById("myForm").style.display = "none";
}



// ========== * ========== //



//changepicture
function changePicture(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.querySelector('.personal_picture').src = e.target.result;
      }
      reader.readAsDataURL(file);
  }
}


// ========== * ========== //


