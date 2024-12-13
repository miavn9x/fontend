// Trình lắng nghe sự kiện khi tài liệu được tải
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
  updateCartCount();
});

// Hiển thị nội dung của giỏ hàng
function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var cartBody = document.getElementById("cart-body");

  // Xóa tránh trùng lặp
  cartBody.innerHTML = "";

  // Lặp qua các mục trong giỏ hàng
  cartItems.forEach((item) => {
    var trContent = `
      <tr>
        <td><img src="${item.productImg}" alt=""></td>
        <td><h3>${item.productName}</h3></td>
        <td><p><span>${item.productPrice}</span> <sup>đ</sup></p></td>
        <td><input type="number" value="${item.quantity}" min="0" onchange="updateQuantity(this, '${item.productName}')"></td>
        <td>
          <button style="height: 70px; width: 130px;font-size: 25px;" type="button" onclick="editQuantity('${item.productName}')">Sửa</button>
          <button style="height: 70px; width: 130px;font-size: 25px;" type="button" onclick="removeCartItem(this, '${item.productName}')">Xóa</button>
        </td>
      </tr>`;
    cartBody.insertAdjacentHTML("beforeend", trContent);
  });

  cartTotal();
  updateCartCount();
}

// Cập nhật số lượng của sản phẩm trong giỏ hàng
function updateQuantity(input, productName) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var item = cartItems.find((item) => item.productName === productName);

  if (item) {
    item.quantity = parseInt(input.value);
    if (item.quantity <= 0) {
      // Nếu số lượng bằng 0 hoặc nhỏ hơn, xóa sản phẩm khỏi giỏ hàng
      removeCartItem(input, productName);
    } else {
      // Nếu số lượng lớn hơn 0, cập nhật giỏ hàng
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      cartTotal();
    }
  }
}

// Chỉnh sửa số lượng của sản phẩm cụ thể trong giỏ hàng
function editQuantity(productName) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var item = cartItems.find((item) => item.productName === productName);

  if (item) {
    var newQuantity = prompt(
      "Vui lòng nhập chính xác số lượng:",
      item.quantity
    );
    if (
      newQuantity !== null &&
      !isNaN(newQuantity) &&
      parseInt(newQuantity) >= 0
    ) {
      item.quantity = parseInt(newQuantity);
      if (item.quantity === 0) {
        removeCartItem(null, productName);
      } else {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        loadCart();
      }
    }
  }
}

// Xóa mục khỏi giỏ hàng và cập nhật tổng giỏ hàng
function removeCartItem(element, productName) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter((item) => item.productName !== productName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  if (element) {
    element.closest("tr").remove();
  }
  loadCart();
  updateCartCount();
}

// Tính toán tổng giá trị giỏ hàng
function cartTotal() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var totalC = cartItems.reduce((total, item) => {
    var productPrice = parseFloat(item.productPrice.replace(/[^\d]/g, ""));
    return total + item.quantity * productPrice;
  }, 0);

  var cartTotalElement = document.querySelector(".price-total span");
  if (cartTotalElement) {
    cartTotalElement.innerHTML = totalC.toLocaleString("de-DE") + " ";
  }
}

// Cập nhật số lượng mặt hàng trong giỏ hàng hiển thị trên trang web
function updateCartCount() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var cartCountElement = document.getElementById("countsp");
  if (cartCountElement) {
    cartCountElement.innerText = cartItems.length;
  }
}

// Kiểm tra và thực hiện thanh toán giỏ hàng
function checkout() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartItems.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng tại Mía PC");
  localStorage.removeItem("cartItems");
  loadCart();
  updateCartCount();
  cartTotal();
}