const validName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入商品名称'));
  }
};

class BrandValidator {
  public static validateName () {
    return {
      name: [
        {validator: validName, trigger: 'blur'}
      ],
      number: [
        {required: true, message: '请输入数量'},
        {type: 'number', message: '数量必须是数字'}
      ],
      price: [
        {required: true, message: '请输入价格'},
        {type: 'number', message: '价格必须是数字'}
      ],
      rest: [
        {required: true, message: '请输入库存数量'},
        {type: 'number', message: '库存数量必须是数字'}
      ]
    };
  }
}

export default BrandValidator
