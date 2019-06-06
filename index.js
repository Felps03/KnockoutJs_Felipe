function Model(nome, nascimento, cpf, peso, altura, descricao, senha) {
    this.nome = ko.observable(nome);
    this.nascimento = ko.observable(nascimento);
    this.cpf = ko.observable(cpf);
    this.peso = ko.observable(peso);
    this.altura = ko.observable(altura);
    this.descricao = ko.observable(descricao);
    this.senha = ko.observable(senha);
}

function ViewModel() {
    var self = this;

    self.nome = ko.observable();
    self.nascimento = ko.observable();
    self.cpf = ko.observable();
    self.peso = ko.observable();
    self.altura = ko.observable();
    self.descricao = ko.observable();
    self.senha = ko.observable();

    self.list = ko.observableArray([]);

    self.carregar = function() {
        $.get("http://localhost:3000/pessoas", function(data) {
            self.list(data);
        });
    }

    self.criar = function() {

        var model = new Model(self.nome(), self.nascimento(), self.cpf(), self.peso(), self.altura(), self.descricao(), self.senha());

        $.post("http://localhost:3000/pessoas/pessoa", model).done(function(data) {
            self.carregar();

            self.nome("");
            self.nascimento("");
            self.cpf("");
            self.peso("");
            self.altura("");
            self.descricao("");
            self.senha("");
        });


    }

}
vm = new ViewModel();

ko.applyBindings(vm);

vm.carregar();