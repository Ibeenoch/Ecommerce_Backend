import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //product seed
  await prisma.product.createMany({
    data: [
      {
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brandId: 1,
        categoryId: 2,
        thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      },
      {
        title: "iPhone X",
        description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brandId: 2,
        categoryId: 2,
        thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        
      },
    ],
  });

  // user seed
  await prisma.user.createMany({
    data: [
      {
        fullName: "Terry Medhurst",
        email: "atuny0@sohu.com",
        role: "USER",
        password: "9uQFF1Lh",
        address: "1745 T Street Southeast",
        phone: 637916758914,
        zipcode: 20020,
        state: "DC",
        country: 'USA',
        city: "Washington",
        OrderId: 2,
      },
      {
        fullName: "hakes timber",
        email: "hakes@tim.com",
        role: "ADMIN",
        password: "9uQFFehjf",
        address: "1145 G Street Southeast",
        phone: 412316758914,
        zipcode: 346022,
        state: "West",
        country: 'New York',
        city: "Chicago",
        OrderId: 1,
      },
    ],
  });

  // Order
  await prisma.order.createMany({
    data: [
        {
            address: '124 adele road, ikeja',
            userId: 2,
            productId: 1,
            status: 'pending',
            totalAmount: 3450,
            totalItems: 1
        },
        {
            address: '34 simiko avenue, agege',
            userId: 1,
            productId: 2,
            status: 'pending',
            totalAmount: 1250,
            totalItems: 3
        },
    ]
  });

  
  // ProductImage
  await prisma.productImage.createMany({
    data: [
        {
            productId: 1,
            url: 'https://cdn.dummyjson.com/product-images/1/1.jpg'
        },
        {
            productId: 1,
            url: "https://cdn.dummyjson.com/product-images/1/2.jpg"
        },
        {
            productId: 1,
            url: "https://cdn.dummyjson.com/product-images/1/3.jpg"
        },
        {
            productId: 1,
            url: 'https://cdn.dummyjson.com/product-images/1/4.jpg'
        },
        {
            productId: 2,
            url: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'
        },
        {
            productId: 2,
            url: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
        },
        {
            productId: 2,
            url: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'
        },
        {
            productId: 2,
            url: "https://cdn.dummyjson.com/product-images/2/3.jpg"
        },
    ]
  }); 

//UserImage
await prisma.userImage.createMany({
    data: [
        {
            userId: 1,
            url: 'https://robohash.org/Terry.png?set=set4'
        },
        {
            userId: 2,
            url: 'https://robohash.org/Sheldon.png?set=set4'
        },
    ]
});

//Cart
await prisma.cart.createMany({
    data: [
        {
            userId: 1,
        },
        {
            userId: 2,
        },
    ]
});

//CartItem
await prisma.cartItem.createMany({
    data: [
        {
            productId: 1,
            cartId: 1,
            quantity: 2,
        },
        {
            productId: 1,
            cartId: 2,
            quantity: 1,
        },
        {
            productId: 2,
            cartId: 2,
            quantity: 1,
        },
        {
            productId: 2,
            cartId: 1,
            quantity: 4,
        },
    ]
});

//Category
await prisma.category.createMany({
data: [
    {
        name: 'laptop'
    },
    {
        name: 'phone'
    },
]
});

//Brand
await prisma.brand.createMany({
    data: [
        {
            name: 'apple'
        },
        {
            name: 'samsung'
        },
    ]
})
};

main().catch((error) => {
    console.log(error);
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect();
});
