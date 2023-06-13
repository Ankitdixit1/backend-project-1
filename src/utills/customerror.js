class Customerror extends Error
{
    Customerror(message,code){
        super(message),
        this.code = code
    }
}
export default Customerror;