const app = {
  events: [],

  addAlarm() {
    const dateAlarm = new Date(DOM.inputDate.value).getTime()
    const now = Date.now()
    const distance = dateAlarm - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const name = DOM.inputName.value

    app.events.push(
      {
        name,
        days,
        hours,
        minutes,
        seconds
      }
    )

  }
}

const DOM = {
  buttonAdd: document.querySelector('#add-event'),
  inputDate: document.querySelector('#date'),
  inputName: document.querySelector('#name-event'),
  form: document.querySelector('#form'),
  countDown: document.querySelector('#countdown'),

  renderLayout() {
    this.countDown.innerHTML = ''
    
    app.events.forEach((event) => {
      layout = `
      <div class="alarm">
        <span class="label">${event.name}</span>
        <div class="alarm__container">
          <div class="alarm__count">
            <div class="count-block">
              <span class="number">${(event.days < 10 ? '0' + event.days : event.days)}</span>
              <span class="count-name">D</span>
            </div>
            <div class="count-block">
              <span class="number">${(event.hours < 10 ? '0' + event.hours : event.hours)}</span>
              <span class="count-name">H</span>
            </div>
            <div class="count-block">
              <span class="number">${(event.minutes < 10 ? '0' + event.minutes : event.minutes)}</span>
              <span class="count-name">M</span>
            </div>
            <div class="count-block">
              <span class="number">${(event.seconds < 10 ? '0' + event.seconds : event.seconds)}</span>
              <span class="count-name">S</span>
            </div>
          </div>
        </div>
      </div>
      `
      this.countDown.innerHTML += layout
    })
  }
}





DOM.buttonAdd.addEventListener('click', () => {
  app.addAlarm()
  DOM.renderLayout()
})

DOM.form.addEventListener('submit', (e) => {
  e.preventDefault()
})