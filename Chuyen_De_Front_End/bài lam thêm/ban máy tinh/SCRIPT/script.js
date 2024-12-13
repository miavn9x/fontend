// Khi tài liệu được tải, cập nhật số lượng giỏ hàng và thêm sự kiện cho các nút thêm vào giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  addCartButtonListeners();
});

// Thêm sự kiện lắng nghe cho các nút "Thêm vào giỏ hàng"
function addCartButtonListeners() {
  document.querySelectorAll(".product-item-text button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const product = event.target.parentElement;
      const productImg = product.querySelector("img").src;
      const productName = product.querySelector("h3").innerText;
      const productPrice = product.querySelector("span").innerText;
      addcart(productPrice, productName, productImg);
    });
  });
}

// Thêm sản phẩm vào giỏ hàng
function addcart(productPrice, productName, productImg) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
  if (cartItems.some((item) => item.productName === productName)) {
    alert(
      "Sản phẩm này đã có trong giỏ hàng. Ấn OK để tiếp tục mua hàng hoặc vào giỏ hàng để thanh toán"
    );
    return;
  }

  // Thêm sản phẩm mới vào giỏ hàng
  cartItems.push({
    productPrice,
    productName,
    productImg,
    quantity: 1
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();

  // thông báo khi thêm vào giỏ hang
  
  // alert(
  //   "Sản phẩm đã được thêm vào giỏ hàng. Ấn OK để tiếp tục mua hàng hoặc vào giỏ hàng để thanh toán"
  // );

}

// Cập nhật số lượng mặt hàng trong giỏ hàng hiển thị trên trang web
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  document.getElementById("countsp").innerText = cartItems.length;
}