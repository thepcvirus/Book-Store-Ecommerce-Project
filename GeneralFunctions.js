export function createNavbar() {
    // Create the main nav element
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg bg-body-tertiary';

    // Create container div
    const container = document.createElement('div');
    container.className = 'container-fluid';

    // Create brand link
    const brandLink = document.createElement('a');
    brandLink.className = 'navbar-brand';
    brandLink.href = 'index.html';
    brandLink.textContent = 'Ketaby';

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggler';
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', '#navbarNav');
    toggleButton.setAttribute('aria-controls', 'navbarNav');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle navigation');

    const toggleIcon = document.createElement('span');
    toggleIcon.className = 'navbar-toggler-icon';
    toggleButton.appendChild(toggleIcon);

    // Create collapsible div
    const collapseDiv = document.createElement('div');
    collapseDiv.className = 'collapse navbar-collapse';
    collapseDiv.id = 'navbarNav';

    // Create nav list
    const navList = document.createElement('ul');
    navList.className = 'navbar-nav';

    // Create nav items
    const navItems = [
        { text: 'Admin', href: 'admin.html', active: true },
        { text: 'Profile', href: 'profile.html' },
        { text: 'Logout', href: '#', id: 'logoutBtn' }
    ];

    navItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';

        const a = document.createElement('a');
        a.className = 'nav-link';
        if (item.active) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
        if (item.href) {
            a.href = item.href;
        }
        if (item.id) {
            a.id = item.id;
        }
        a.textContent = item.text;

        li.appendChild(a);
        navList.appendChild(li);
    });

    // Assemble all elements
    collapseDiv.appendChild(navList);
    container.appendChild(brandLink);
    container.appendChild(toggleButton);
    container.appendChild(collapseDiv);
    nav.appendChild(container);

    return nav;
}


export function createProductCard(DivID, ImageUrl, BookName, AutherName, Genre, Price, book = null) {
    // Create the main card div
    const card = document.createElement('div');
    card.className = 'card Product_Card col-6 col-md-3';

    // Create and append the image
    const img = document.createElement('img');
    img.src = ImageUrl || '0356.png'; // Default image if not provided
    img.className = 'card-img-top';
    img.alt = 'Book Cover';
    card.appendChild(img);

    // Create the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body Data_Section row';

    // Create and append the title
    const title = document.createElement('h3');
    title.className = 'card-title col-12';
    title.textContent = BookName || 'Book Name'; // Default if not provided
    cardBody.appendChild(title);

    // Create and append the author
    const author = document.createElement('h4');
    author.className = 'Auth_Name col-12';
    author.textContent = AutherName || 'Author Name'; // Default if not provided
    cardBody.appendChild(author);

    // Create and append the genre
    const genre = document.createElement('h5');
    genre.className = 'Genre col-12';
    genre.textContent = Genre || 'Genre'; // Default if not provided
    cardBody.appendChild(genre);

    // Create and append the price
    const price = document.createElement('h5');
    price.className = 'Price col-sm-12 col-md-6';
    price.textContent = Price ? `${Price}$` : '500$'; // Default if not provided
    cardBody.appendChild(price);

    // Create and append the button
    const button = document.createElement('button');
    button.className = 'btn Add_To_Cart col-sm-12 col-md-6';
    button.textContent = 'Add To Cart';
    button.addEventListener("click", () => {
        addToCart(book);
    });
    cardBody.appendChild(button);

    // Append card body to card
    card.appendChild(cardBody);

    // Append card to the specified div
    const targetDiv = document.getElementById(DivID);
    if (targetDiv) {
        console.log("Card Printed");

        targetDiv.appendChild(card);
    } else {
        console.error(`Element with id "${DivID}" not found`);
    }
}


export function addTableRow(tableId, number, name, price, book) {
    // Create the table row element
    const row = document.createElement('tr');

    // Create and append the number cell
    const numberCell = document.createElement('td');
    numberCell.textContent = number || '';
    row.appendChild(numberCell);

    // Create and append the name cell
    const nameCell = document.createElement('td');
    nameCell.textContent = name || '';
    row.appendChild(nameCell);

    // Create and append the quantity cell with input
    let btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.role = "group";
    // minus the amount of books button
    let minusBtn = document.createElement("button");
    minusBtn.className = "btn btn-sm btn-outline-secondary";
    minusBtn.textContent = "-";
    minusBtn.onclick = () => decreaseQuantity(book.id);

    let quantitySpan = document.createElement("span");
    quantitySpan.className = "mx-2";
    quantitySpan.textContent = book.quantity;

    // plus the amount of books button
    let plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-sm btn-outline-secondary";
    plusBtn.textContent = "+";
    plusBtn.onclick = () => increaseQuantity(book.id);

    btnGroup.appendChild(minusBtn);
    btnGroup.appendChild(quantitySpan);
    btnGroup.appendChild(plusBtn);
    //quantityCell.appendChild(quantityInput);
    row.appendChild(btnGroup);

    // Create and append the price cell
    const priceCell = document.createElement('td');
    priceCell.textContent = price ? `${price}$` : '0$';
    row.appendChild(priceCell);

    // Create and append the delete button cell
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Remove';
    deleteButton.onclick = () => removeFromCart(book.id);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Add event listener for the delete button
    deleteButton.addEventListener('click', function () {
        row.remove();
    });

    // Find the table and append the row
    const table = document.getElementById(tableId);
    if (table) {
        // Append to the table body if it exists, otherwise to the table directly
        const tbody = table.querySelector('tbody') || table;
        tbody.appendChild(row);
    } else {
        console.error(`Table with id "${tableId}" not found`);
    }
}
// Usage example:
// document.body.prepend(createNavbar());
// or append to a specific element:
// document.getElementById('header').appendChild(createNavbar());

let lastVisibleDocs = new Map(); // يجب أن تكون في أعلى الملف خارج أي دالة

export async function displayBooksForUser(
  bookContainer,
  selectedCategory = "all",
  append = false
) {
  let db = firebase.firestore();
  let bookcontainer = document.getElementById(bookContainer);

  if (!append) {
    bookcontainer.innerHTML = "";
    lastVisibleDocs = new Map(); // إعادة تعيين عند بحث/تصفية جديد
  }

  try {
    let query = db.collection("cars");

    // تطبيق الفلتر حسب الفئة
    if (selectedCategory !== "all") {
      query = query.where("gener", "==", selectedCategory);
    }

    
// تطبيق الترتيب والحد
    //query = query.orderBy("name").limit(9);
    

    // تطبيق Pagination إذا وجد
    if (append && lastVisibleDocs.get(selectedCategory)) {
      query = query.startAfter(lastVisibleDocs.get(selectedCategory));
    }

    //const snapshot = await query.get();
    let booksQuery;
    const booksRef = db.collection("cars");

    if (selectedCategory === "all") {
      booksQuery = lastVisibleDocs.get("all")
        ? booksRef
            //.orderBy("name")
            .startAfter(lastVisibleDocs.get("all"))
            .limit(9)
        : booksRef.orderBy("name").limit(9);
    } else {
      booksQuery = lastVisibleDocs.get(selectedCategory)
        ? booksRef
            .where("gener", "==", selectedCategory)
            //.orderBy("name")
            .startAfter(lastVisibleDocs.get(selectedCategory))
            .limit(9)
        : booksRef
            .where("gener", "==", selectedCategory)
            //.orderBy("name")
            .limit(9);
    }

    let booksSnapshot = await booksQuery.get();

    if (booksSnapshot.empty) {
      if (!append) {
        let alert = document.createElement("p");
        alert.className = "text-center";
        alert.textContent = "No books found.";
        bookcontainer.appendChild(alert);
      }
      return;
    }

    // حفظ آخر مستند لكل فئة
    const lastVisible = booksSnapshot.docs[booksSnapshot.docs.length - 1];
    if (selectedCategory === "all") {
      lastVisibleDocs.set("all", lastVisible);
    } else {
      lastVisibleDocs.set(selectedCategory, lastVisible);
    }

    booksSnapshot.forEach((doc) => {
      let book = doc.data();
      book.id = doc.id;

      createProductCard(
        bookContainer,
        book.url_image || "0356.png",
        book.name || "Unknown Book",
        book.author || "Unknown Author",
        book.gener || "Unknown Genre",
        book.price || 0,
        book
      );
    });

    // التحكم في ظهور زر "Load More"
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.style.display = booksSnapshot.size < 9 ? "none" : "block";
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    let errorMsg = document.createElement("p");
    errorMsg.className = "text-danger";
    errorMsg.textContent = "Error loading books: " + error.message;
    bookcontainer.appendChild(errorMsg);
  }
}
export function loadMoreBooks() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter ? categoryFilter.value : "all";
  displayBooksForUser("ProductsList", selectedCategory, true);
}
// last edit from osama


// add to cart function
export function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingBook = cart.find(item => item.id === book.id);
    // check if the book already added or not
    if (existingBook) {
        // if existed , the user can add the same books 5 times only 
        if (existingBook.quantity < 5) {
            existingBook.quantity += 1;
            alert(`You added the ${existingBook.name}  ${existingBook.quantity} times`);
        } else {
            alert("You can't add the same book more than 5");
        }
    } else {
        // if the book not added into the cart before
        book.quantity = 1;
        cart.push(book);
        alert("Book added to cart");

    }

    // store the cart into localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Cart operations
export function loadCart() {
    let cartContainer = document.getElementById("CartList");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCostEl = document.getElementById("totalCost");
    cartContainer.innerHTML = "";

    // let total = 0;
    let total = calculateTotal(cart);
    totalCostEl.textContent = `Total: ${total} EP`;

    cart.forEach(book => {
        // total += book.price * book.quantity;

        let col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        let card = document.createElement("div");
        card.className = "card h-100";

        let bookImg = document.createElement("img");
        bookImg.src = book.url_image;
        bookImg.alt = book.name;
        bookImg.className = "card-img-top";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column justify-content-between";

        let bookName = document.createElement("h5");
        bookName.className = "card-title";
        bookName.textContent = book.name;

        // let author = document.createElement("p");
        // author.className = "card-text";
        // author.textContent = `Author: ${book.author}`;

        let price = document.createElement("p");
        price.className = "card-text";
        price.textContent = `Price: ${book.price} EP`;

        let controlDiv = document.createElement("div");
        controlDiv.className = "d-flex align-items-center justify-content-between";

        // Quantity controls
        let btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";
        btnGroup.role = "group";
        // minus the amount of books button
        let minusBtn = document.createElement("button");
        minusBtn.className = "btn btn-sm btn-outline-secondary";
        minusBtn.textContent = "-";
        minusBtn.onclick = () => decreaseQuantity(book.id);

        let quantitySpan = document.createElement("span");
        quantitySpan.className = "mx-2";
        quantitySpan.textContent = book.quantity;

        // plus the amount of books button
        let plusBtn = document.createElement("button");
        plusBtn.className = "btn btn-sm btn-outline-secondary";
        plusBtn.textContent = "+";
        plusBtn.onclick = () => increaseQuantity(book.id);

        btnGroup.appendChild(minusBtn);
        btnGroup.appendChild(quantitySpan);
        btnGroup.appendChild(plusBtn);
        // remove the book button
        let removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-sm btn-danger";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromCart(book.id);

        controlDiv.appendChild(btnGroup);
        controlDiv.appendChild(removeBtn);

        cardBody.appendChild(bookName);
        // cardBody.appendChild(author);
        cardBody.appendChild(price);
        cardBody.appendChild(controlDiv);

        card.appendChild(bookImg);
        card.appendChild(cardBody);
        col.appendChild(card);
        //cartContainer.appendChild(col);

        addTableRow('CartList', book.id, book.name, book.price, book);
    });

    document.getElementById("totalCost").textContent = total;
}




// calculate total
export function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
// increase amount of books function
export function increaseQuantity(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(b => b.id === bookId);
    if (item && item.quantity < 5) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    } else {
        alert("You reched the max limit (5)")
    }
}
// decrease amount of books function
export function decreaseQuantity(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(b => b.id === bookId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    } else {
        alert(`If you want to remove ${item.name} book , you can click 'Remove' button`)
    }
}
// remove book function
export function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(book => book.id !== bookId);
    if (confirm(`Are you sure you want to remove book from your cart? `)) {
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}

// Search function for books
export function searchBooks(searchBook) {
    let db = firebase.firestore();
    let bookcontainer = document.getElementById('ProductsList');
    bookcontainer.innerHTML = "";

    db.collection("cars").get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                let alert = document.createElement("p");
                alert.className = "text-center";
                alert.textContent = "No books found.";
                bookcontainer.appendChild(alert);
                return;
            }
            let matchedBooks = false;
            querySnapshot.forEach(doc => {
                let book = doc.data();
                book.id = doc.id;
                // make search book and books in the firestore to lowercase to avoid case sensitive
                let searchBookLower = searchBook.toLowerCase();
                let bookNameLower = book.name.toLowerCase();

                // Check if the search book match books in firestore
                if (bookNameLower.includes(searchBookLower)) {
                    matchedBooks = true;
                    createProductCard(
                        'ProductsList',
                        book.url_image,
                        book.name,
                        book.author,
                        book.gener,
                        book.price,
                        book
                    );
                }
            });

            // there is no matched books 
            if (!matchedBooks) {
                let noResults = document.createElement("p");
                noResults.className = "text-center";
                noResults.textContent = "No matched books";
                bookcontainer.appendChild(noResults);
            }
        })
        .catch((error) => {
            console.error("Error searching books:", error);
            let errorMsg = document.createElement("p");
            errorMsg.className = "text-danger";
            errorMsg.textContent = "Error searching books.";
            bookcontainer.appendChild(errorMsg);
        });
}

// start payment with paypal
export function paypalPayment(totalAmount) {
    paypal.Buttons({
        // Set up the transaction
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalAmount // The total amount from the cart
                    }
                }]
            });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                // Show success message
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Clear the cart
                localStorage.removeItem("cart");
                // Update the display
                loadCart();
                // Redirect to success page or show success message
                window.location.href = "profile.html";
            });
        },

        // Handle errors
        onError: function (err) {
            console.error('PayPal Error:', err);
            alert('An error occurred during the payment process. Please try again.');
        }
    }).render('#paypal-button-container');
}

function getImageUrlFromImagesFolder(filename) {//needs the file name from the database to get it's url
  // Get Firebase Storage reference
  //const storage = firebase.storage();
  
  // Create reference to the image in the 'images' folder
  const imageRef = storage.ref().child(`images/${filename}`);
  
  // Return the download URL promise
  return imageRef.getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error("Error getting image URL:", error);
      throw error;
    });
}





export async function displayBooksSorted(sortType = null) {
    let db = firebase.firestore();
    let bookContainer = document.getElementById('ProductsList');
    bookContainer.innerHTML = "";

    try {
        let books = [];
        let snapshot = await db.collection("cars").get();
        snapshot.forEach(doc => {
            let book = doc.data();
            book.id = doc.id;
            books.push(book);
        });

        // Apply sorting based on sortType
        if (sortType === "price-asc") {
            books.sort((a, b) => a.price - b.price);
        } else if (sortType === "price-desc") {
            books.sort((a, b) => b.price - a.price);
        } else if (sortType === "name-asc") {
            books.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "name-desc") {
            books.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Render books
        books.forEach(book => {
            createProductCard(
                'ProductsList',
                book.url_image,
                book.name,
                book.author,
                book.gener,
                book.price,
                book
            );
        });
    } catch (error) {
        console.error("Error sorting books:", error);
        let errorMsg = document.createElement("p");
        errorMsg.className = "text-danger";
        errorMsg.textContent = "Error loading sorted books.";
        bookContainer.appendChild(errorMsg);
    }
}

























export async function filterBooksByPrice(maxPrice) {
    let db = firebase.firestore();
    let bookContainer = document.getElementById('ProductsList');
    bookContainer.innerHTML = "";

    try {
        let books = [];
        let snapshot = await db.collection("cars").get();
        snapshot.forEach(doc => {
            let book = doc.data();
            book.id = doc.id;
            books.push(book);
        });

        let filtered = books.filter(book => parseFloat(book.price) <= maxPrice);

        if (filtered.length === 0) {
            let alert = document.createElement("p");
            alert.className = "text-center";
            alert.textContent = "No books found under this price.";
            bookContainer.appendChild(alert);
        } else {
            filtered.forEach(book => {
                createProductCard(
                    'ProductsList',
                    book.url_image,
                    book.name,
                    book.author,
                    book.gener,
                    book.price,
                    book
                );
            });
        }

    } catch (error) {
        console.error("Error filtering books:", error);
        let errorMsg = document.createElement("p");
        errorMsg.className = "text-danger";
        errorMsg.textContent = "Error loading books.";
        bookContainer.appendChild(errorMsg);
    }
}
