const app = {
  events: [],

  addAlarm() {
    const name = DOM.inputName.value.replace(/ /g, "")
    const dateAlarm = new Date(DOM.inputDate.value).getTime()
    const now = Date.now()
    const distance = dateAlarm - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    if (name.length < 1 || DOM.inputDate.value == '') {
      return DOM.messageErro("Preencha todas as informações!")
    }

    if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
      return DOM.messageErro("Data invalida! (Você já está atrasado)")
    }

    app.events.push(
      {
        name,
        days,
        hours,
        minutes,
        seconds
      }
    )

    if (app.events.length == 1) {
      app.count = setInterval(app.countDown, 1000)
    }

  },

  countDown() {
    app.events.forEach((event, index) => {
      if (event.days == 0 && event.hours == 0 && event.minutes == 0 && event.seconds == 0) {
        alert(`${event.name} finalizado!`)
        app.events.splice(index, 1)
      }

      if (event.seconds == 0) {
        if (event.minutes > 0) {
          event.minutes--
        }
        event.seconds = 60
      }
      if (event.minutes == 0) {
        if (event.hours > 0) {
          event.hours--
        }
      }
      if (event.hours == 0) {
        if (event.days > 0) {
          event.days--
        }
      }

      event.seconds--
      DOM.renderLayout()
    });

    if (app.events.length == 0) {
      clearInterval(app.count);
    }
  }
}

const DOM = {
  buttonAdd: document.querySelector('#add-event'),
  inputDate: document.querySelector('#date'),
  inputName: document.querySelector('#name-event'),
  form: document.querySelector('#form'),
  countDownContainer: document.querySelector('#countdown'),
  erroContainer: document.querySelector('#message-erro'),

  renderLayout() {
    this.countDownContainer.innerHTML = ''
    
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
      this.countDownContainer.innerHTML += layout
    })
  },

  messageErro(message) {
    this.erroContainer.querySelector('.label-erro').innerText = message
    this.erroContainer.classList.add('active')

    setTimeout(() => {
      this.erroContainer.classList.remove('active')
    }, 4000)
  }
}





DOM.buttonAdd.addEventListener('click', () => {
  app.addAlarm()
  DOM.renderLayout()
})

DOM.form.addEventListener('submit', (e) => {
  e.preventDefault()
})