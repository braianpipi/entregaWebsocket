const fs = require('fs')

//Creo clase con la que creare un objeto donde mantener los mensajes
class Messages{
   constructor(file){
       this.file = file;
    }

    async leer() {
        const data = await fs.promises.readFile(this.file, "utf-8");
        const dataJson = JSON.parse(data);
        return dataJson;
      }
    
    async save(objeto) {
        try {
          let content = await this.leer();
          let idUltimo = content.map((e) => e.id);
          let idAsignado = Math.max(...idUltimo);
          idAsignado++;
          objeto = {
            id: idAsignado,
            email: objeto.email,
            text: objeto.text,
            date: objeto.date
          };
          content.push(objeto);
          await fs.promises.writeFile(this.file, `${JSON.stringify(content)}`);
        } catch (error) {
          console.log(" save error", error);
        }
      }

    async getAll(){
        try{
            const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const messages = JSON.parse(content);
            return messages;
        }
        catch(err){
            console.log("getAll error",err);
        }
    }
}

module.exports = Messages