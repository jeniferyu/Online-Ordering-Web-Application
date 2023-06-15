Instructions about how to run the server:
1. Type "npm install" in terminal to install all the dependencies for this project

2. Type in "node server.js" in terminal to run the sever.


3. http://localhost:3000 get to the home page.


4. Click the header on "Vendors" or go to "http://localhost:3000/vendors" link to a page in which all recipes with its specific link will be listed and shown in that page. You could see all vendors in the database. 


5. Click on the link on the specific vendor, you would be linked to its own page, which has its information and you could also modify them.


6. Or you could go to "http://localhost:3000/vendors/${vendorid}" to view a specific vendor page with its id. 

You could see the information of the vendor. Includes name, delivery fee, minimum order and its supply list. 

On this page, you could also modify its name, delivery fee and minimum order information. 

On the other hand, you could add a new item in specific supplies of this vendor, if it has at least one supply. The add part is in the end of page, after its supply list. When you add the name, price, stock, description, and click the "Add Item" button, a new item would be added in supplies, and show on the page.

If you have made all changes you want, you may click the "Save Change" button, and the modified data would be sent to the server. You could go to the page of the vendor you have changed to see if it is updated.

And, I didn't implement part 5d in this part.


7. Click the header on "Add a vendor" or go to "http://localhost:3000/addvendor" link to the add vendor page. You could type the name, the delivery fee and minimum order amount. As soon as you click the "Save the new vendor" button, this new vendor will be added in the vendors database.


That's all, thank you so much!
