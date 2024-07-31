<h1>Personal finances tracking API</h1>
<p>The following project consists on an API that keeps track of the expenses and incomes of the users registered. The database used is Mongodb.</p>
<p>In order to implement the auth, whenever a user has logged in or registered, a cookie is given with an access-token, using JWT, which will be checked when accessing the other endpoints of the API.</p>
<p>The endpoints related with the expenses and incomes ables the user to perform CRUD operations.</p>
<h3>The operations permitted for both expenses and incomes are: </h3>
<ul>
  <li>Get all</li>
  <li>Get by id</li>
  <li>Create</li>
  <li>Update</li>
  <li>Delete</li>
</ul>
<p>Naturally, these operations are restricted to the elements that are property of the user.</p>
<h3>Warning</h3>
<p>Beware that the program is lacking some sensible information as the one related with the database. In order to solve the problem is encouraged to create a .env file in the root directory of the project and add the missing environment variables.</p>
