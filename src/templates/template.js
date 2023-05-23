
export default function template(email){
    var templateU={
        from_name:"SONA",
        to_name: "Usuario con correo : " + email,
        message:"Nos pidió conocer su contraseña ya que se le olvidó, nosotros tampoco la sabemos, jeje. " + '\n Por favor vaya al siguiente link http://localhost:3000/restorepassword  ',
        reply_to: "flores.montero.alan.leonardo@gmail.com",
        to_email: email
      }
      return templateU;
}