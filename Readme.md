1. POST<!-- for sign up API -->
   <!-- For post first name,lastname,email and password -->
   <!-- example
   {
   	"firstname":"suraj",
   	"lastname":"gole",
   	"email": "suraj@gmail.com",
        "password": "surajgole"
   } -->

   http://localhost:8080/sign-up

2. POST<!-- for LOG IN  API -->
   <!-- For post email id and password -->
   <!-- example
   {
   "email":"suraj@gmail.com",
   "password":"surajgole"
   } -->
   http://localhost:8080/login

3.PUT

<!-- for edit data in mongoose -->
<!-- For pass user-id in router ->
<!-- pass editable data in playload -->

http://localhost:8080/edit-profile/626bbf2878ea2168debc7fd7

            <!-- { "firstname": "navin",
                  "lastname": "razz",
                  "biodata": "i am navin",
                  "gender":"male",
                  "dateofbirth":"05-03-1998",
                  "mobile": "9235684952",
                  "email": "navin123@gmail.com"
                  }  -->

<!-- header -->

    <!-- auth-token:token			  -->

4. Patch
   <!-- its for change password -->
   <!-- <!-- For pass user-id in router --->
   http://localhost:8080/login/changepwd/626ce14198b6585b483d7069

<!-- {
"password": "123456789",
"newpassword": "1234567891"
} -->
<!-- header -->

    <!-- auth-token:token			  -->

5.GET

<!-- its for defalut value in edit field -->
<!-- <!-- For pass user-id in router -> -->

http://localhost:8080/profile/626ce14198b6585b483d7069

<!-- header -->

    <!-- auth-token:token			  -->

6.POST

<!-- its for post feed  -->

http://localhost:8080/post

<!-- header -->
<!--
{
     image :'../h'
caption :"hghghg"
}
 -->

    <!-- auth-token:token			  -->

8.GET

<!-- pagination feed  -->

http://localhost:8080/?page=1&limit=3000

<!-- header -->

    <!-- auth-token:token			  -->

9.PUT

<!-- update  feed -->
<!-- update through id  -->

http://localhost:8080/626e16420b2b01dc8e4ad962

<!--
{
     image :'../h'
caption :"hghghg"
}
 -->

10 DELETE

<!-- delete feed  -->

http://localhost:8080/626e16420b2b01dc8e4ad962

<!-- header -->
 <!-- auth-token:token			  -->

11. get
    <!-- check All data in sign up form  -->

    http://localhost:8080/sign-up/All

12. PUT
    <!-- its for like comment API   -->
    <!-- send playload user id  -->
    <!-- send API Feed ID to access like -->
    http://localhost:8080/like/626e268671fe4e2d8e266eb2
    <!-- example:
    {
    "id":"626ce14198b6585b483d7069",
    "comment":"its okay"// if hit like button  not send comment

} -->
