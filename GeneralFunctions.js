import { firebaseConfig } from "./ConfigFile.js";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.firestore();

export function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3";

  const container = document.createElement("div");
  container.className = "container-fluid px-4";

  // Brand
  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand fw-bold text-warning";
  brandLink.href = "index.html";
  brandLink.textContent = "📚 Ketaby";

  // Toggle button
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

  // Collapse section
  const collapseDiv = document.createElement("div");
  collapseDiv.className = "collapse navbar-collapse";
  collapseDiv.id = "navbarNav";

  const navList = document.createElement("ul");
  navList.className = "navbar-nav ms-auto d-flex align-items-center gap-3";

  const navItems = [
    {
      text: "Home",
      href: "index.html",
      icon: "bi-house-door-fill",
      active: true,
    },
    { text: "Profile", href: "profile.html", icon: "bi-person-circle" },
    { text: "Cart", href: "cart.html", icon: "bi-cart3", id: "cartNav" },
    {
      text: "Logout",
      href: "logout.html",
      icon: "bi-box-arrow-right",
      id: "logoutBtn",
    },
  ];

  navItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    const a = document.createElement("a");
    a.className = "nav-link d-flex align-items-center gap-2 fw-semibold";
    a.style.transition = "color 0.3s ease";

    if (item.active) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }

    if (item.href) a.href = item.href;
    if (item.id) a.id = item.id;

    const icon = document.createElement("i");
    icon.className = `bi ${item.icon} fs-5`;

    const text = document.createTextNode(item.text);
    a.appendChild(icon);
    a.appendChild(text);
    li.appendChild(a);
    navList.appendChild(li);
  });

  collapseDiv.appendChild(navList);
  container.appendChild(brandLink);
  container.appendChild(toggleButton);
  container.appendChild(collapseDiv);
  nav.appendChild(container);

  // navbar static

  let lastScrollTop = 0;
  const navbar = document.querySelector("nav.navbar");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // if (currentScroll > lastScrollTop && currentScroll > 80) {
    //   // Scrolling down
    //   navbar.classList.add("navbar-partial");
    //   navbar.classList.remove("navbar-visible");
    // } else {
    //   // Scrolling up
    //   navbar.classList.remove("navbar-partial");
    //   navbar.classList.add("navbar-visible");
    // }

    lastScrollTop = currentScroll;
  });

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
    if (totalCostEl) totalCostEl.textContent = "Total: 0 $";
    return;
  }
  let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
  if (cartContainer) cartContainer.innerHTML = "";
  let total = calculateTotal(cart);
  if (totalCostEl) totalCostEl.textContent = ` ${total} $`;
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
  if (confirm(`Are you sure you want to remove book from your cart? `)) {
    cart = cart.filter((book) => book.id !== bookId);
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    loadCart();
  } else {
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

  // Clear existing PayPal buttons
  const paypalContainer = document.getElementById("paypal-button-container");
  if (paypalContainer) {
    paypalContainer.innerHTML = "";
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
            userId: user.uid,
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
        loadCart();
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
//edit 994
// دالة fetchNextBooks (بدون تغيير، لأنها شغالة صح مع زر "Load More")
async function fetchNextBooks({
  query,
  dynamicLimit,
  shownBookIds,
  lastVisibleCombined,
}) {
  let books = [];
  let localLastVisible = lastVisibleCombined;

  try {
    let q = query;
    if (localLastVisible) {
      q = q.startAfter(localLastVisible);
    }
    let snapshot = await q.limit(dynamicLimit).get();
    console.log("Snapshot size:", snapshot.size); // سجل للتحقق
    console.log("Shown book IDs before:", [...shownBookIds]); // سجل للتحقق

    if (!snapshot.empty) {
      localLastVisible = snapshot.docs[snapshot.docs.length - 1];
      let newBooks = snapshot.docs
        .map((doc) => {
          let book = doc.data();
          book.id = doc.id;
          return book;
        })
        .filter((book) => !shownBookIds.has(book.id));

      newBooks.forEach((book) => shownBookIds.add(book.id));
      books.push(...newBooks);
      console.log("Fetched books:", books.length); // سجل للتحقق
    }

    // تحقق مما إذا كان هناك المزيد من الكتب
    let hasMore = snapshot.size >= dynamicLimit;

    console.log("Has more:", hasMore); // سجل للتحقق
    return { books, lastVisible: localLastVisible, hasMore };
  } catch (error) {
    console.error("Error fetching next books:", error);
    return { books: [], lastVisible: localLastVisible, hasMore: false };
  }
}

// دالة filterBooksCombined المعدلة
let lastVisibleCombined = null;
let shownBookIds = new Set();
let searchResults = [];
let currentSearchIndex = 0;

export async function filterBooksCombined({
  bookContainerId = "ProductsList",
  category = "all",
  searchTerm = "",
  maxPrice = 1000,
  sortType = "price-asc",
  append = false,
} = {}) {
  let db = firebase.firestore();
  let bookContainer = document.getElementById(bookContainerId);

  // إعادة تعيين متغيرات الـ pagination عند بدء فلتر جديد
  if (!append) {
    bookContainer.innerHTML = "";
    lastVisibleCombined = null;
    shownBookIds = new Set();
    searchResults = [];
    currentSearchIndex = 0;
    console.log(
      "Reset pagination - Category:",
      category,
      "Sort:",
      sortType,
      "Search:",
      searchTerm,
      "MaxPrice:",
      maxPrice
    ); // سجل للتحقق
  }

  let query = db.collection("cars");
  if (category && category !== "all") {
    query = query.where("gener", "==", category); // استخدام gener كما أكدت
    console.log("Filtering by category:", category); // سجل للتحقق
  }

  let dynamicLimit = 9;
  let isSearch = searchTerm && searchTerm.trim() !== "";
  if (isSearch) {
    dynamicLimit = 50;
    console.log("Search mode - Term:", searchTerm); // سجل للتحقق
  }

  // تطبيق الترتيب والفلترة
  if (maxPrice !== undefined && maxPrice !== null && maxPrice < 100000) {
    query = query.where("price", "<=", maxPrice);
    console.log("Filtering by maxPrice:", maxPrice); // سجل للتحقق
  }

  // تطبيق الترتيب بناءً على sortType في كل الحالات
  if (sortType === "price-desc") {
    query = query.orderBy("price", "desc");
  } else if (sortType === "price-asc") {
    query = query.orderBy("price", "asc");
  }
  console.log("Sorting by:", sortType); // سجل للتحقق

  // جلب الكتب
  const {
    books: nextBooks,
    lastVisible,
    hasMore,
  } = await fetchNextBooks({
    query,
    dynamicLimit,
    shownBookIds,
    lastVisibleCombined,
  });
  lastVisibleCombined = lastVisible;

  // إذا كان هناك بحث نصي
  if (isSearch) {
    const searchTermLower = searchTerm.toLowerCase().trim();
    // تحديث searchResults مع الأخذ في الاعتبار الفلاتر
    searchResults = append ? searchResults : nextBooks; // إعادة تعيين searchResults إذا لم يكن append
    searchResults = searchResults.filter(
      (book) =>
        (book.name && book.name.toLowerCase().includes(searchTermLower)) ||
        (book.author && book.author.toLowerCase().includes(searchTermLower))
    );
    console.log("Search results count:", searchResults.length); // سجل للتحقق

    let booksToShow = searchResults.slice(
      currentSearchIndex,
      currentSearchIndex + 9
    );
    booksToShow.forEach((book) => {
      createProductCard(
        bookContainerId,
        book.url_image,
        book.name,
        book.author,
        book.gener,
        book.price,
        book
      );
      shownBookIds.add(book.id);
    });
    currentSearchIndex += booksToShow.length;
    console.log("Search books shown:", booksToShow.length); // سجل للتحقق
  } else {
    // عرض الكتب بدون بحث نصي
    nextBooks.forEach((book) => {
      createProductCard(
        bookContainerId,
        book.url_image,
        book.name,
        book.author,
        book.gener,
        book.price,
        book
      );
      shownBookIds.add(book.id);
    });
    console.log("Non-search books shown:", nextBooks.length); // سجل للتحقق
  }

  // إدارة زر "Load More"
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      hasMore || (isSearch && currentSearchIndex < searchResults.length)
        ? "block"
        : "none";
    loadMoreBtn.onclick = () =>
      filterBooksCombined({
        bookContainerId,
        category,
        searchTerm,
        maxPrice,
        sortType,
        append: true,
      });
    console.log("Load More button display:", loadMoreBtn.style.display); // سجل للتحقق
  }

  // عرض رسالة إذا لم يتم العثور على كتب
  if (nextBooks.length === 0 && !isSearch && !append) {
    let alert = document.createElement("p");
    alert.className = "text-center";
    alert.textContent = "No books found.";
    bookContainer.appendChild(alert);
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
  } else if (isSearch && searchResults.length === 0 && !append) {
    let alert = document.createElement("p");
    alert.className = "text-center";
    alert.textContent = "No books found.";
    bookContainer.appendChild(alert);
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
  }
}
//end edit 994
// Unified filter function for category, search, and price.

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

// Get user's cart from Firestore
async function getUserCart(userId) {
  try {
    const cartDoc = await database.collection("carts").doc(userId).get();
    if (cartDoc.exists) {
      return cartDoc.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
}
// update user cart
async function updateUserCart(userId, cart) {
  try {
    await database.collection("carts").doc(userId).set({ items: cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

export async function displayAdminOrders() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const adminOrdersList = document.getElementById("adminOrdersList");
  if (!adminOrdersList) return;

  try {
    // Get all orders for admin without status filter
    const ordersSnapshot = await database
      .collection("orders")
      .where("userId", "==", user.uid)
      .limit(50)
      .get();

    // Sort the results in memory
    const orders = ordersSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA; // Sort in descending order
      });

    adminOrdersList.innerHTML = "";

    orders.forEach((order) => {
      const row = document.createElement("tr");

      // Order ID
      const idCell = document.createElement("td");
      idCell.textContent = order.id;
      row.appendChild(idCell);

      // Date
      const dateCell = document.createElement("td");
      const date =
        order.createdAt && order.createdAt.toDate
          ? order.createdAt.toDate().toLocaleString()
          : "N/A";
      dateCell.textContent = date;
      row.appendChild(dateCell);

      // Total
      const totalCell = document.createElement("td");
      totalCell.textContent = `${order.total || 0} $`;
      row.appendChild(totalCell);

      // Items
      const itemsCell = document.createElement("td");
      if (order.items && Array.isArray(order.items)) {
        itemsCell.innerHTML = order.items
          .map(
            (item) =>
              `<div>${item.name} x${item.quantity} - ${item.price} $</div>`
          )
          .join("");
      } else {
        itemsCell.textContent = "No items";
      }
      row.appendChild(itemsCell);

      // Status
      const statusCell = document.createElement("td");
      statusCell.textContent = order.status || "Completed";
      row.appendChild(statusCell);

      adminOrdersList.appendChild(row);
    });

    if (orders.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.className = "text-center";
      cell.textContent = "No orders found";
      row.appendChild(cell);
      adminOrdersList.appendChild(row);
    }

    // Also add admin orders to the main orders list
    const ordersList = document.getElementById("ordersList");
    if (ordersList) {
      orders.forEach((order) => {
        const row = document.createElement("tr");

        // Order ID
        const idCell = document.createElement("td");
        idCell.textContent = order.id;
        row.appendChild(idCell);

        // Username (Admin)
        const userCell = document.createElement("td");
        userCell.textContent = "Admin";
        row.appendChild(userCell);

        // Date
        const dateCell = document.createElement("td");
        const date =
          order.createdAt && order.createdAt.toDate
            ? order.createdAt.toDate().toLocaleString()
            : "N/A";
        dateCell.textContent = date;
        row.appendChild(dateCell);

        // Total
        const totalCell = document.createElement("td");
        totalCell.textContent = `${order.total || 0} $`;
        row.appendChild(totalCell);

        // Items
        const itemsCell = document.createElement("td");
        if (order.items && Array.isArray(order.items)) {
          itemsCell.innerHTML = order.items
            .map(
              (item) =>
                `<div>${item.name} x${item.quantity} - ${item.price} $</div>`
            )
            .join("");
        } else {
          itemsCell.textContent = "No items";
        }
        row.appendChild(itemsCell);

        ordersList.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "text-center text-danger";
    cell.textContent = "Error loading orders: " + error.message;
    row.appendChild(cell);
    adminOrdersList.appendChild(row);
  }
}
