var base_url = "http://localhost:3000/";

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
    self.id = ko.observable();
    self.nome = ko.observable();
    self.nascimento = ko.observable();
    self.cpf = ko.observable();
    self.peso = ko.observable();
    self.altura = ko.observable();
    self.descricao = ko.observable();
    self.senha = ko.observable();

    self.list = ko.observableArray([]);

    // self.carregar = function() {
    //     $.get(base_url + "pessoas", function(data) {
    //         self.list(data);
    //     });
    // }

    self.carregar = function(data) {
        $.ajax({
            url: base_url + "pessoas",
            type: 'GET',
            success: function(result) {
                self.list(result);
            },
            error: function(erro) {
                console.log(erro);
            }
        });
    }

    self.criar = function() {
        var model = new Model(self.nome(), self.nascimento(), self.cpf(), self.peso(), self.altura(), self.descricao(), self.senha());
        $.post(base_url + "pessoas/pessoa", model).done(function(data) {
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

    self.remover = function(data) {
        $.ajax({
            url: base_url + "pessoas/pessoa/" + data.id,
            type: 'DELETE',
            success: function(result) {
                self.carregar();
            },
            error: function(erro) {
                console.log(erro);
            }
        });
    }

    self.busca = function(data) {
        $.ajax({
            url: base_url + "pessoas/pessoa/" + data.id,
            type: 'GET',
            success: function(result) {
                self.id(data.id);
                self.nome(result[0].nome);
                self.nascimento(result[0].nascimento);
                self.cpf(result[0].cpf);
                self.peso(result[0].peso);
                self.altura(result[0].altura);
                self.descricao(result[0].descricao);
                self.senha(result[0].senha);
            },
            error: function(erro) {
                console.log(erro);
            }
        });
    }

    self.editar = function(data) {
        /*
        $.ajax({
            url: base_url + "pessoas/pessoa/" + data.id,
            type: 'DELETE',
            success: function(result) {
                self.carregar();
            },
            error: function(erro) {
                console.log(erro);
            }
        });
        */
    }
}

vm = new ViewModel();

ko.applyBindings(vm);

vm.carregar();