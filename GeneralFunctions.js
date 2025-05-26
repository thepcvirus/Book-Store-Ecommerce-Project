export function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg bg-body-tertiary";
  const container = document.createElement("div");
  container.className = "container-fluid";
  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand";
  brandLink.href = "index.html";
  brandLink.textContent = "Ketaby";
  const toggleButton = document.createElement("button");
  toggleButton.className = "navbar-toggler";
  toggleButton.type = "button";
  toggleButton.setAttribute("data-bs-toggle", "collapse");
  toggleButton.setAttribute("data-bs-target", "#navbarNav");
  toggleButton.setAttribute("aria-controls", "navbarNav");
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-label", "Toggle navigation");
  const toggleIcon = document.createElement("span");
  toggleIcon.className = "navbar-toggler-icon";
  toggleButton.appendChild(toggleIcon);
  const collapseDiv = document.createElement("div");
  collapseDiv.className = "collapse navbar-collapse";
  collapseDiv.id = "navbarNav";
  const navList = document.createElement("ul");
  navList.className = "navbar-nav";
  const navItems = [
    { text: "Home", href: "index.html", active: true },
    { text: "Profile", href: "profile.html" },
    { text: "Logout", href: "logout.html", id: "logoutBtn" },
  ];
  navItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "nav-item";
    const a = document.createElement("a");
    a.className = "nav-link";
    if (item.active) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
    if (item.href) a.href = item.href;
    if (item.id) a.id = item.id;
    a.textContent = item.text;
    li.appendChild(a);
    navList.appendChild(li);
  });
  collapseDiv.appendChild(navList);
  container.appendChild(brandLink);
  container.appendChild(toggleButton);
  container.appendChild(collapseDiv);
  nav.appendChild(container);
  return nav;
}

export function createProductCard(
  DivID,
  ImageUrl,
  BookName,
  AutherName,
  Genre,
  Price,
  book = null
) {
  const card = document.createElement("div");
  card.className = "card Product_Card col-6 col-md-3";
  const img = document.createElement("img");
  img.src = ImageUrl || "0356.png";
  img.className = "card-img-top";
  img.alt = "Book Cover";
  const imgLink = document.createElement("a");
  imgLink.href = `show.html?id=${book.id}`;
  imgLink.appendChild(img);
  card.appendChild(imgLink);
  const cardBody = document.createElement("div");
  cardBody.className = "card-body Data_Section row";
  const title = document.createElement("h3");
  title.className = "card-title col-12";
  title.textContent = BookName || "Book Name";
  const titleLink = document.createElement("a");
  titleLink.href = `show.html?id=${book.id}`;
  titleLink.appendChild(title);
  cardBody.appendChild(titleLink);
  const author = document.createElement("h4");
  author.className = "Auth_Name col-12";
  author.textContent = AutherName || "Author Name";
  cardBody.appendChild(author);
  const genre = document.createElement("h5");
  genre.className = "Genre col-12";
  genre.textContent = Genre || "Genre";
  cardBody.appendChild(genre);
  const price = document.createElement("h5");
  price.className = "Price col-sm-12 col-md-6";
  price.textContent = Price ? `${Price}$` : "500$";
  cardBody.appendChild(price);
  const button = document.createElement("button");
  button.className = "btn Add_To_Cart col-sm-12 col-md-6";
  button.textContent = "Add To Cart";
  button.addEventListener("click", () => {
    addToCart(book);
  });
  cardBody.appendChild(button);
  card.appendChild(cardBody);
  const targetDiv = document.getElementById(DivID);
  if (targetDiv) {
    targetDiv.appendChild(card);
  } else {
    console.error(`Element with id "${DivID}" not found`);
  }
}

export function addTableRow(tableId, number, name, price, book) {
  const row = document.createElement("tr");
  const numberCell = document.createElement("td");
  numberCell.textContent = number || "";
  row.appendChild(numberCell);
  const nameCell = document.createElement("td");
  nameCell.textContent = name || "";
  row.appendChild(nameCell);
  let btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";
  btnGroup.role = "group";
  let minusBtn = document.createElement("button");
  minusBtn.className = "btn btn-sm btn-outline-secondary";
  minusBtn.textContent = "-";
  minusBtn.onclick = () => decreaseQuantity(book.id);
  let quantitySpan = document.createElement("span");
  quantitySpan.className = "mx-2";
  quantitySpan.textContent = book.quantity;
  let plusBtn = document.createElement("button");
  plusBtn.className = "btn btn-sm btn-outline-secondary";
  plusBtn.textContent = "+";
  plusBtn.onclick = () => increaseQuantity(book.id);
  btnGroup.appendChild(minusBtn);
  btnGroup.appendChild(quantitySpan);
  btnGroup.appendChild(plusBtn);
  row.appendChild(btnGroup);
  const priceCell = document.createElement("td");
  priceCell.textContent = price ? `${price}$` : "0$";
  row.appendChild(priceCell);
  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.textContent = "Remove";
  deleteButton.onclick = () => removeFromCart(book.id);
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);
  deleteButton.addEventListener("click", function () {
    row.remove();
  });
  const table = document.getElementById(tableId);
  if (table) {
    const tbody = table.querySelector("tbody") || table;
    tbody.appendChild(row);
  } else {
    console.error(`Table with id "${tableId}" not found`);
  }
}

export function loadMoreBooks() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter ? categoryFilter.value : "all";
  filterBooksCombined({
    bookContainerId: "ProductsList",
    category: selectedCategory,
    append: true,
  });
}

// add to cart function
export function addToCart(book) {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login first to add items to cart");
    window.location.href = "login.html";
    return;
  }
  let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
  let existingBook = cart.find((item) => item.id === book.id);
  if (existingBook) {
    if (existingBook.quantity >= 5) {
      alert("You can't add the same book more than 5");
    } else {
      existingBook.quantity++;
      alert(
        `You added the ${existingBook.name}  ${existingBook.quantity} times`
      );
    }
  } else {
    cart.push({
      id: book.id,
      name: book.name,
      price: book.price,
      quantity: 1,
    });
    alert(` ${book.name} added to cart successfully`);
  }
  localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
  loadCart();
}

export function loadCart() {
  const user = firebase.auth().currentUser;
  let cartContainer = document.getElementById("CartList");
  let totalCostEl = document.getElementById("totalCost");
  if (!user) {
    if (cartContainer) cartContainer.innerHTML = "";
    if (totalCostEl) totalCostEl.textContent = "Total: 0 EP";
    return;
  }
  let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
  if (cartContainer) cartContainer.innerHTML = "";
  let total = calculateTotal(cart);
  if (totalCostEl) totalCostEl.textContent = `Total: ${total} EP`;
  cart.forEach((book) => {
    addTableRow("CartList", book.id, book.name, book.price, book);
  });
}

export function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function increaseQuantity(bookId) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
  let item = cart.find((b) => b.id === bookId);
  if (item && item.quantity < 5) {
    item.quantity += 1;
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    loadCart();
  } else {
    alert("You reched the max limit (5)");
  }
}

export function decreaseQuantity(bookId) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
  let item = cart.find((b) => b.id === bookId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    loadCart();
  } else {
    alert(
      `If you want to remove ${item.name} book , you can click 'Remove' button`
    );
  }
}

export function removeFromCart(bookId) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
  cart = cart.filter((book) => book.id !== bookId);
  if (confirm(`Are you sure you want to remove book from your cart? `)) {
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    loadCart();
  }
}

export function paypalPayment(totalAmount, /*orderId,*/ userId) {
  const database = firebase.firestore();
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }
  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "pay",
      },
      createOrder: function (_data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: totalAmount.toString(),
              },
              description: "Book Store Purchase",
            },
          ],
        });
      },
      onApprove: async function (_data, actions) {
        try {
          const order = await actions.order.capture();
          await database.collection("orders").add({
            userId: userId,
            items: JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [],
            total: totalAmount,
            status: "completed",
            paymentId: order.id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            paymentDetails: {
              payer: order.payer,
              status: order.status,
              create_time: order.create_time,
              update_time: order.update_time,
            },
          });
          localStorage.removeItem(`cart_${user.uid}`);
          alert("Payment successful! Thank you for your purchase.");
          window.location.href = "index.html";
        } catch (error) {
          console.error("Payment failed:", error);
          alert("Payment failed. Please try again.");
        }
      },
      onCancel: function (data) {
        alert("Payment cancelled.");
      },
      onError: function (err) {
        alert("An error occurred during payment. Please try again.");
      },
    })
    .render("#paypal-button-container");
}

export function UploadImage(ImgInputFieldID, storage) {
  const imageUpload = document.getElementById(ImgInputFieldID);
  const file = imageUpload.files[0];
  if (!file) {
    console.log("Please select an image first");
    return;
  }
  const imageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(imageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Uploading: ${Math.round(progress)}%`);
    },
    (error) => {
      console.log(`Upload failed: ${error.message}`);
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        return downloadURL;
      } catch (error) {
        console.log("Error getting download URL:", error);
      }
    }
  );
}

export async function displayBooksSorted(sortType = null) {
  let db = firebase.firestore();
  let bookContainer = document.getElementById("ProductsList");
  bookContainer.innerHTML = "";
  try {
    let books = [];
    let snapshot = await db.collection("cars").get();
    snapshot.forEach((doc) => {
      let book = doc.data();
      book.id = doc.id;
      books.push(book);
    });
    if (sortType === "price-asc") {
      books.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-desc") {
      books.sort((a, b) => b.price - a.price);
    } else if (sortType === "name-asc") {
      books.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "name-desc") {
      books.sort((a, b) => b.name.localeCompare(a.name));
    }
    books.forEach((book) => {
      createProductCard(
        "ProductsList",
        book.url_image,
        book.name,
        book.author,
        book.gener,
        book.price,
        book
      );
    });
  } catch (error) {
    let errorMsg = document.createElement("p");
    errorMsg.className = "text-danger";
    errorMsg.textContent = "Error loading sorted books.";
    bookContainer.appendChild(errorMsg);
  }
}

// Unified filter function for category, search, and price.
let lastVisibleCombined = null;
let shownBookIds = new Set();
export async function filterBooksCombined({
  bookContainerId = "ProductsList",
  category = "all",
  searchTerm = "",
  maxPrice = 100000,
  append = false,
} = {}) {
  let db = firebase.firestore();
  let bookContainer = document.getElementById(bookContainerId);
  if (!append) {
    bookContainer.innerHTML = "";
    lastVisibleCombined = null;
    shownBookIds = new Set();
  }
  let query = db.collection("cars");
  if (category && category !== "all") {
    query = query.where("gener", "==", category);
  }
  // Firebase Firestore: if using inequality on price, must orderBy price first
  if (maxPrice !== undefined && maxPrice !== null && maxPrice < 1000) {
    query = query.where("price", "<=", maxPrice);
    query = query.orderBy("price").orderBy("name");
  } else {
    query = query.orderBy("name");
  }
  query = query.limit(9);
  if (append && lastVisibleCombined) {
    query = query.startAfter(lastVisibleCombined);
  }
  let snapshot = await query.get();
  lastVisibleCombined = snapshot.docs[snapshot.docs.length - 1];
  let filteredBooks = snapshot.docs.map((doc) => {
    let book = doc.data();
    book.id = doc.id;
    return book;
  });
  if (searchTerm && searchTerm.trim() !== "") {
    const searchTermLower = searchTerm.toLowerCase().trim();
    filteredBooks = filteredBooks.filter(
      (book) => book.name && book.name.toLowerCase().includes(searchTermLower)
    );
  }
  filteredBooks = filteredBooks.filter((book) => !shownBookIds.has(book.id));
  filteredBooks.forEach((book) => shownBookIds.add(book.id));

  if (filteredBooks.length === 0 && !append) {
    let alert = document.createElement("p");
    alert.className = "text-center";
    alert.textContent = "No books found.";
    bookContainer.appendChild(alert);
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }
  filteredBooks.forEach((book) => {
    createProductCard(
      bookContainerId,
      book.url_image,
      book.name,
      book.author,
      book.gener,
      book.price,
      book
    );
  });
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      snapshot.size < 9 || filteredBooks.length === 0 ? "none" : "block";
    loadMoreBtn.onclick = () =>
      filterBooksCombined({
        bookContainerId,
        category,
        searchTerm,
        maxPrice,
        append: true,
      });
  }
}
export function CheckAdmin(emailToCheck) {
  const registeredEmails = [
    "thepcvirus@gmail.com",
    "oo@gmail.com",
    "admin@website.net",
  ];
  return registeredEmails.some(
    (email) => email.toLowerCase() === emailToCheck.toLowerCase().trim()
  );
}
