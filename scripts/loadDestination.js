// scripts/modules/loadDestination.js

export async function loadDestination() {
  const response = await fetch('./data/tours.json');
  const tours = await response.json();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const tour = tours.find(item => item.id === id);
  if (!tour) {
    document.body.innerHTML = '<p style="text-align: center; margin-top: 100px;">Тур не найден 😕</p>';
    return;
  }

  // Заголовок и изображение
  document.querySelector('[data-title]').textContent = tour.title;
  document.querySelector('[data-hero-img]').src = tour.image;

  // Рейтинг
  const starsContainer = document.querySelector('[data-stars]');
  starsContainer.innerHTML = '';
  for (let i = 0; i < tour.rating; i++) {
    const star = document.createElement('span');
    star.classList.add('destination__star');
    starsContainer.appendChild(star);
  }

  document.querySelector('[data-raiting]').textContent = `${tour.rating}/5`;
  document.querySelector('[data-reviews]').textContent = `(${tour.reviews} Отзывов)`;

  // Описание
  const descWrapper = document.querySelector('[data-description]');
  descWrapper.innerHTML = '';
  tour.description.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    descWrapper.appendChild(p);
  });

  // Теги
  const tagsContainer = document.querySelector('[data-tags]');
  tagsContainer.innerHTML = '';
  tour.tags.forEach(tag => {
    const span = document.createElement('span');
    span.classList.add('destination-tag', 'tag');
    span.classList.add(tour.region === 'europe' ? 'tag--europe' : 'tag--asia');
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Вкладки
  const tabsWrapper = document.querySelector('[data-tabs]');
  tabsWrapper.innerHTML = '';
  tour.tabs?.forEach(tab => {
    const tabDiv = document.createElement('div');
    tabDiv.className = 'destination__tab';
    tabDiv.innerHTML = `
      <h2 class="destination__tab-title h3">${tab.title}</h2>
      <div class="destination__tab-description"><p>${tab.text}</p></div>
    `;
    tabsWrapper.appendChild(tabDiv);
  });

  // Таблица сезонов
  const table = document.querySelector('[data-season-table]');
  const tableTitle = document.querySelector('[data-season-title]');
  tableTitle.textContent = tour.seasonTitle;
  table.innerHTML = `
    <tr class="table-row">
      <td class="table-value table-value--large table-value--gray">Сезон</td>
      <td class="table-value table-value--large table-value--gray">Месяцы</td>
      <td class="table-value table-value--large table-value--gray">Погода</td>
      <td class="table-value table-value--large table-value--gray">Рекомендации</td>
    </tr>
  `;
  tour.season?.forEach(season => {
    const tr = document.createElement('tr');
    tr.className = 'table-row';
    tr.innerHTML = `
      <td class="table-value">${season.season}</td>
      <td class="table-value">${season.months}</td>
      <td class="table-value table-value--text-center">
        <span>${season.weather[0]}</span>
        <span>${season.weather[1]}</span>
      </td>
      <td class="table-value">${season.note}</td>
    `;
    table.appendChild(tr);
  });

  // Факты
  const factsList = document.querySelector('[data-facts]');
  factsList.innerHTML = '';
  tour.facts?.forEach(fact => {
    const li = document.createElement('li');
    li.className = 'facts-card__item';
    li.innerHTML = `
      <img aria-hidden="true" src="./icons/destination/${fact.icon || 'geo'}.svg" class="facts-card__icon">
      <div class="facts-card__content">
        <span class="facts-card__label">${fact.label}</span>
        ${Array.isArray(fact.value)
        ? fact.value.map(v => `<span class="facts-card__value">${v}</span>`).join('')
        : `<span class="facts-card__value">${fact.value}</span>`}
      </div>
    `;
    factsList.appendChild(li);
  });

  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = tour.image;
  document.head.appendChild(preloadLink);

  // Погода будет подключаться позже
}
