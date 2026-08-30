async function test() {
  try {
    const regReq = await fetch('http://localhost:3200/api/auth/login', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test3@test.com', password: 'password' }) 
    });
    const reg = await regReq.json();
    const token = reg.token;
    
    const foodsReq = await fetch('http://localhost:3200/api/foods');
    const foods = await foodsReq.json();
    const foodId = foods.foods[0]._id;
    console.log("foodId is:", foodId);
    
    const cartReq = await fetch('http://localhost:3200/api/cart', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ foodId, quantity: 1 })
    });
    const cart = await cartReq.json();
    console.log('CART SUCCESS:', JSON.stringify(cart));
  } catch (e) {
    console.error('ERROR:', e.message);
  }
}
test();
