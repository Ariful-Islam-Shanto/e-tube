//? Set the category buttons in the main parts 1st section

let categoryId;
let presentCateId;

const cateButton = async (sort) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  console.log(data.data[0].category);
  const category = data.data;

  const cateContainer = document.getElementById("categoryButtons");
  cateContainer.innerText = '';
  

  let count = cateContainer.childElementCount;
  category.forEach((cate) => {
    
    const button = document.createElement("button");
    
    button.setAttribute('id', `button${count + 1}`);
    count++;
    button.onclick = () => {
      presentCateId = cate.category_id;
      categoryId = event.target.id;
      button.classList.add('bg-red-600', 'text-white');
      categoryData(presentCateId, categoryId, sort);
    };
    if (cate.category === "All") {
      button.classList.add(
        "btn",
        "btn-active",
        "bg-red-600",
        "text-white",
        "px-8"
      );
    }
    button.classList.add("btn", "btn-active","ml-10", "mb-8");
    button.innerText = `${cate.category}`;

    cateContainer.appendChild(button);
  });
};




//? Step: 02 set the category data in the second section

const categoryData = async (id, newId, sort) => {
 
  const blogPost = document.getElementById("blogPost");
  blogPost.classList.add('hidden');


  document.getElementById('button')
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.classList.add("grid", "sm:grid-cols-1","md:grid-cols-2", "gap-6", "lg:grid-cols-4");
  cardContainer.innerHTML = '';

  if(newId === "button2") {
    document.getElementById('button3').classList.remove('bg-red-600');
    document.getElementById('button4').classList.remove('bg-red-600');
    document.getElementById('button1').classList.remove('bg-red-600');
  }
  if(newId === "button3") {
    document.getElementById('button2').classList.remove('bg-red-600');
    document.getElementById('button4').classList.remove('bg-red-600');
    document.getElementById('button1').classList.remove('bg-red-600');
  }
  if(newId === "button4") {
    document.getElementById('button3').classList.remove('bg-red-600');
    document.getElementById('button2').classList.remove('bg-red-600');
    document.getElementById('button1').classList.remove('bg-red-600');
  }
  if(newId === "button1") {
    document.getElementById('button3').classList.remove('bg-red-600');
    document.getElementById('button4').classList.remove('bg-red-600');
    document.getElementById('button2').classList.remove('bg-red-600');
  }
 
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();

  
  let cateGory;
  

  if(!sort) {
    cateGory = data.data;
  }
  else{
     cateGory = data.data;
     cateGory.forEach(cate => {
      cate.views = parseFloat(cate.others.views.split('k')[0]);
    })

    cateGory.sort((x, y) => {
      return y.views - x.views;
    })
  }
  
  if(cateGory.length === 0) {
    cardContainer.classList.remove('grid', 'grid-cols-4', 'w-full', 'gap-6');
    cardContainer.classList.add('w-full');
    return  cardContainer.innerHTML = `
    <img class="mx-auto my-auto mt-32 mb-8" src=./images/icon.png />
    <h1 class="text-center text-4xl text-black font-bold" >Oops!! Sorry, There is <br> no content here</h1>
    `;
  }else{
    cardContainer.classList.add('grid', 'w-full', 'gap-6')
  }

  cateGory.forEach((cate) => {

    const postedDate = cate.others.posted_date !== '' ? cate.others.posted_date : "";
    const totalMinutes = Math.floor(postedDate / 60);
    const hours = Math.floor( totalMinutes / 60);
    const hoursIntoMinutes = hours * 60;
    const minutes = totalMinutes - hoursIntoMinutes;
    

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <figure id="figureImg" class="relative" ><img class="h-[200px] w-96 rounded-lg";  src=${
          cate.thumbnail
        } alt="thumbnail" />
       <div id="myDiv" class="absolute bg-black p-[4px] text-xs rounded-lg text-white bottom-2 right-2" ><span>${hours}hr </span>${minutes} min ago</span></div>
        </figure>
        <div class="py-6 flex gap-4">
          <div class="">
          <div class=" rounded-full">
          <img class="rounded-full w-12 h-12" src=${cate.authors !== [] ? cate.authors[0].  profile_picture : ""} />
          </div>
          </div>

          <div>
          <h2 class="text-lg text-black font-semibold">${cate?.title}</h2>
          <h2 class="flex items-center gap-1 text-xs text-gray-500 font-medium">${
            cate.authors !== [] ? cate.authors[0].profile_name : ""
          } <span>${cate?.authors[0]?.verified !== true ? "<img class='w-3' src='./images/blueBadge.png'/>" : "false"
        }
          </span></h2>
          <p class="text-xs text-gray-500 font-medium" >${
            cate.others !== null ? cate?.others.views : "No views"
          } views </p>
          
          </div>
        </div>
        `;
        cardContainer.appendChild(div);
        const myDiv =  div.querySelector('#myDiv');
        if(hours === 0 && minutes === 0) {
          myDiv.style.display = 'none';
        }
        else{
          myDiv.style.display = 'block';
        }
    
  });
  
};
cateButton();
categoryData(1000);



const sortByView = document.getElementById('sortByView');
sortByView.addEventListener('click', () => {
  if(!presentCateId) {
    presentCateId = 1000;
  }
  console.log(presentCateId);
  categoryData(presentCateId ,categoryId, true)

})




const blog = () => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  cardContainer.classList.remove("grid", "sm:grid-cols-1" ,"md:grid-cols-2", "gap-6", "lg:grid-cols-4");
  const blogPost = document.getElementById("blogPost");
  blogPost.classList.remove('hidden');
};