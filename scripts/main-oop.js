class Order {
    constructor() {
        this.dish = null;
        this.drink = null;
        this.dessert = null;
        this.orderButton = null;
        this.confirmButton = null;
        this.cancelButton = null;

        this.initialize();
    }

    initialize() {
        this.confirmButton = document.querySelector(".confirmar");
        this.cancelButton = document.querySelector(".cancelar");
        this.orderButton = document.querySelector(".fazer-pedido");
        
        this.confirmButton.addEventListener("click", () => {
            this.sendMessage();
          });
          
          this.cancelButton.addEventListener("click", () => {
            this.cancel();
          });
          
          this.orderButton.addEventListener("click", () => {
            this.confirm();
          });
    }

    verify() {
        if(this.dish && this.drink && this.dessert) {
            this.orderButton.classList.add("ativo");
            this.orderButton.disabled = false;
            this.orderButton.innerHTML = 'Fazer pedido';
        }
    }

    calculateTotal() {
        return this.dish.price + this.drink.price + this.dessert.price; 
    }

    confirm() {
        const modal = document.querySelector(".overlay");
        modal.classList.remove("escondido");
      
        document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
          this.dish.name;
        document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
          this.dish.price.toFixed(2);
      
        document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
          this.drink.name;
        document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
          this.drink.price.toFixed(2);
      
        document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
          this.dessert.name;
        document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
          this.dessert.price.toFixed(2);
      
        document.querySelector(".confirmar-pedido .total .preco").innerHTML =
          this.calculateTotal().toFixed(2); 
    }

    cancel() {
        const modal = document.querySelector(".overlay");
        modal.classList.add("escondido");
    }

    sendMessage() {
        const telefoneRestaurante = 553299999999;
        const encodedText = encodeURIComponent(
          `Olá, gostaria de fazer o pedido: \n- Prato: ${
            this.dish.name
          } \n- Bebida: ${this.drink.name} \n- Sobremesa: ${
            this.dessert.name
          } \nTotal: R$ ${this.calculateTotal().toFixed(2)}`
        );
      
        const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
        window.open(urlWhatsapp);
    }
}

class Dish {
    constructor({name, image, desc, price, element, order}) {
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.price = price;
        this.order = order;
        this.element = null;

        this.initialize();
    }

    initialize() {
        const view = document.createElement("div");
        view.classList.add("opcao");
        view.addEventListener("click", () => {
            this.selectDish();
        });
        view.innerHTML = `
        <img src="${this.image}" />
        <div class="titulo">${this.name}</div>
        <div class="descricao">${this.desc}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.price.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
        `;

        const dishContainer = document.querySelector(".opcoes.prato");
        dishContainer.appendChild(view);
        this.element = view;
    }

    selectDish() {
        this.order.dish = this;
        const selected = document.querySelector(".prato .selecionado");
        if (selected !== null) {
            selected.classList.remove("selecionado");
        }
        this.element.classList.add("selecionado");

        this.order.verify();
    }
}

class Drink {
    constructor({name, image, desc, price, order}) {
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.price = price;
        this.order = order;
        this.element = null;

        this.initialize();
    }

    initialize() {
        const view = document.createElement("div");
        view.classList.add("opcao");
        view.addEventListener("click", () => {
            this.selectDrink();
        });
        view.innerHTML = `
        <img src="${this.image}" />
        <div class="titulo">${this.name}</div>
        <div class="descricao">${this.desc}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.price.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
        `;

        const drinkContainer = document.querySelector(".opcoes.bebida");
        drinkContainer.appendChild(view);
        this.element = view;
    }

    selectDrink() {
        this.order.drink = this;
        const selected = document.querySelector(".bebida .selecionado");
        if (selected !== null) {
            selected.classList.remove("selecionado");
        }
        this.element.classList.add("selecionado");

        this.order.verify();
    }
}

class Dessert {
    constructor({name, image, desc, price, order}) {
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.price = price;
        this.order = order;
        this.element = null;

        this.initialize();
    }

    initialize() {
        const view = document.createElement("div");
        view.classList.add("opcao");
        view.addEventListener("click", () => {
            this.selectDessert();
        });
        view.innerHTML = `
        <img src="${this.image}" />
        <div class="titulo">${this.name}</div>
        <div class="descricao">${this.desc}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.price.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
        `;

        const dessertContainer = document.querySelector(".opcoes.sobremesa");
        dessertContainer.appendChild(view);
        this.element = view;
    }

    selectDessert() {
        this.order.dessert = this;
        const selected = document.querySelector(".sobremesa .selecionado");
        if (selected !== null) {
            selected.classList.remove("selecionado");
        }
        this.element.classList.add("selecionado");

        this.order.verify();
    }
}

const dishes = [
    {
      name: "Estrombelete de Frango",
      image: "img/frango_yin_yang.png",
      desc: "Um pouco de batata, um pouco de salada",
      price: 14.9,
    },
    {
      name: "Asa de Boi",
      image: "img/frango_yin_yang.png",
      desc: "Com molho shoyu",
      price: 14.9,
    },
    {
      name: "Carne de Monstro",
      image: "img/frango_yin_yang.png",
      desc: "Com batata assada e farofa",
      price: 14.9,
    },
  ];
  const drinks = [
    {
      name: "Coquinha gelada",
      image: "img/coquinha_gelada.png",
      desc: "Lata 350ml",
      price: 4.9,
    },
    {
      name: "Caldo de Cana",
      image: "img/coquinha_gelada.png",
      desc: "Copo 600ml",
      price: 4.9,
    },
    {
      name: "Corote Gelado",
      image: "img/coquinha_gelada.png",
      desc: "Garrafa 400ml",
      price: 4.9,
    },
  ];
  const desserts = [
    {
      name: "Pudim",
      image: "img/pudim.png",
      desc: "Gosto de doce de leite",
      price: 7.9,
    },
    {
      name: "Flam",
      image: "img/pudim.png",
      desc: "Gosto de chocolate",
      price: 7.9,
    },
    {
      name: "Brigadeiro",
      image: "img/pudim.png",
      desc: "3 unidades",
      price: 7.9,
    },
  ];

window.onload = () => {
    const order = new Order();

    dishes.forEach(dish => new Dish({...dish, order}));
    drinks.forEach(drink => new Drink({...drink, order}));
    desserts.forEach(dessert => new Dessert({...dessert, order}));
}