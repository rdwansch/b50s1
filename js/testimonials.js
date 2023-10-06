const testimonials = [
  {
    name: 'Surya Eldanto',
    quote: 'Keren Banget Jasa nya',
    ratting: 5,
    image:
      'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=310&q=50',
  },
  {
    name: 'Pratomo',
    quote: 'Lumayan Oke',
    ratting: 4,
    image:
      'https://images.unsplash.com/photo-1524660988542-c440de9c0fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGUlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=310&q=50',
  },
  {
    name: 'Amanda J',
    quote: 'Tidak direkomendasikan karena mahal dan banyak bug',
    ratting: 1,
    image:
      'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=310&q=50',
  },
  {
    name: 'Jessica',
    quote: 'Bagus dan sesuai',
    ratting: 4,
    image:
      'https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=310&q=50',
  },
  {
    name: 'Ariel Mastra',
    quote: 'Biasa aja',
    ratting: 3,
    image:
      'https://images.unsplash.com/photo-1590031905406-f18a426d772d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=310&q=50',
  },
].sort((a, b) => b.ratting - a.ratting);

const renderHTML = data => {
  let htmlContent = '';
  if (data.length == 0) {
    htmlContent = '<h2>Data not found</h2>';
  } else {
    // prettier-ignore
    htmlContent = data.map(testimonial => /*html*/ `
      <div class="card">
        <img src="${testimonial.image}" alt="Person" />
        <q>${testimonial.quote}</q>
        <h5>- ${testimonial.name}</h5>
        <p>${testimonial.ratting  }&#9733;</p>
      </div>`
    ).join("");
  }

  const cardWrapper = document.querySelector('.card__wrapper');

  console.log(htmlContent);
  cardWrapper.innerHTML = htmlContent;
};

renderHTML(testimonials);

document.querySelectorAll('.ratting__wrapper div').forEach(ratting =>
  ratting.addEventListener('click', e => {
    const data = testimonials.filter(testimonial => testimonial.ratting == e.target.dataset.ratting);

    // console.log(data);
    if (e.target.dataset.ratting == 'all') {
      renderHTML(testimonials);
      return;
    }
    renderHTML(data);
  })
);
