
// Minimal JS for smooth scrolling and demo purchase links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if(a){
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
    }
  }
});

// Replace placeholder links easily:
window.TLC_CONFIG = {
  donate_links: {
    paypal: "https://www.paypal.com/donate?hosted_button_id=REPLACE_ME",
    stripe: "https://buy.stripe.com/test_REPLACE_ME"
  },
  tiers: [
    {name:"Supporter", price:5, perks:["Monthly update","Wall of Thanks"], link:"https://buy.stripe.com/test_SUPPORTER_REPLACE"},
    {name:"Advocate", price:15, perks:["Everything in Supporter","Quarterly print","Discord role"], link:"https://buy.stripe.com/test_ADVOCATE_REPLACE"},
    {name:"Champion", price:50, perks:["Everything in Advocate","Behind‑the‑scenes video","Name on donor page"], link:"https://buy.stripe.com/test_CHAMPION_REPLACE"}
  ],
  products: [
    {title:"Denim Hat", price:35, image:"assets/denim-hat.jpg", link:"https://buy.stripe.com/test_DENIMHAT_REPLACE"},
    {title:"Art Print – Love vs Fear", price:25, image:"assets/art-print.jpg", link:"https://buy.stripe.com/test_ARTPRINT_REPLACE"},
    {title:"Sticker Pack", price:8, image:"assets/stickers.jpg", link:"https://buy.stripe.com/test_STICKERS_REPLACE"}
  ]
};

function mountDynamic(){
  // Donation buttons
  const dp = document.querySelector('[data-paypal]');
  const ds = document.querySelector('[data-stripe]');
  if(dp) dp.href = TLC_CONFIG.donate_links.paypal;
  if(ds) ds.href = TLC_CONFIG.donate_links.stripe;

  // Tiers
  const tiersRoot = document.getElementById('tiers-root');
  if(tiersRoot){
    tiersRoot.innerHTML = '';
    TLC_CONFIG.tiers.forEach(t => {
      const li = t.perks.map(p=>`<li>${p}</li>`).join('');
      const el = document.createElement('div');
      el.className = 'tier';
      el.innerHTML = `
        <div class="badge">${t.name}</div>
        <div class="price">$${t.price}/mo</div>
        <ul>${li}</ul>
        <a class="btn" href="${t.link}" target="_blank" rel="noopener">Join ${t.name}</a>
      `;
      tiersRoot.appendChild(el);
    });
  }

  // Products
  const storeRoot = document.getElementById('store-root');
  if(storeRoot){
    storeRoot.innerHTML = '';
    TLC_CONFIG.products.forEach(p => {
      const el = document.createElement('div');
      el.className = 'product';
      el.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <div class="body">
          <strong>${p.title}</strong>
          <div class="price">$${p.price}</div>
          <a class="btn buy" href="${p.link}" target="_blank" rel="noopener">Buy</a>
        </div>
      `;
      storeRoot.appendChild(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', mountDynamic);
