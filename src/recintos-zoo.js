class RecintosZoo {
    constructor() {
      
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'macaco', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'leao', quantidade: 1 }] }
      ];
  
      
      this.animais = {
        LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    
    analisaRecintos(animal, quantidade) {
      const tipoAnimal = animal.toUpperCase();
      
      
      if (!this.animais.hasOwnProperty(tipoAnimal)) {
        return { erro: "Animal inválido" };
      }
  
      // Valida se a quantidade é um número válido e positivo
      if (typeof quantidade !== 'number' || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animais[tipoAnimal];
      const tamanhoNecessario = animalInfo.tamanho * quantidade;
      const biomasAdequados = animalInfo.bioma;
      const carnivoro = animalInfo.carnivoro;
      
      let recintosViaveis = [];
  
      for (let recinto of this.recintos) {
        // Verifica se o bioma é adequado
        if (!biomasAdequados.includes(recinto.bioma)) {
          continue;
        }
  
        
        let espacoOcupadoAtual = recinto.animais.reduce((acc, animal) => {
          const especieAnimal = animal.especie.toUpperCase();
          return acc + (this.animais[especieAnimal].tamanho * animal.quantidade);
        }, 0);
  
        // Regras para carnívoros
        if (carnivoro && recinto.animais.length > 0) {
          continue;
        }
  
        // Regras para manter conforto dos animais atuais
        if (recinto.animais.some(animal => this.animais[animal.especie.toUpperCase()].carnivoro)) {
          continue; 
        }
  
        // Regras para macacos
        if (tipoAnimal === 'MACACO' && recinto.animais.length === 0) {
          continue; 
        }
  
        // Regras para hipopótamos
        if (tipoAnimal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
          continue; 
        }
  
      
        const precisaEspacoExtra = recinto.animais.length > 0;
        const espacoTotalNecessario = precisaEspacoExtra ? tamanhoNecessario + 1 : tamanhoNecessario;
  
      
        const espacoLivre = recinto.tamanho - espacoOcupadoAtual;
        if (espacoLivre >= espacoTotalNecessario) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoTotalNecessario} total: ${recinto.tamanho})`);
        }
      }
  
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: "Não há recinto viável" };
      }
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  