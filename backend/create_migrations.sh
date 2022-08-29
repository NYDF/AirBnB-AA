npx sequelize model:generate --name ReviewImage --attributes reviewId:integer,url:string,createdAt:date,updatedAt:date

npx sequelize model:generate --name Booking --attributes spotId:integer,userId:integer,startDate:date,endDate:date,createdAt:date,updatedAt:date

npx sequelize model:generate --name Review --attributes spotId:integer,userId:integer,review:string,stars:integer,createdAt:date,updatedAt:date

npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal,createdAt:date,updatedAt:date

npx sequelize model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean,createdAt:date,updatedAt:date

npx sequelize seed:generate --name review-image

npx sequelize seed:generate --name booking

npx sequelize seed:generate --name review

npx sequelize seed:generate --name spot

npx sequelize seed:generate --name spot-image
