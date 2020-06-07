// 可以把各个界面的接口请求统一合并到一个文件里面

//require.context 属于webpack的一个方法，自动化的去导入模块
// 适用于什么场景,如果遇到引入很多模块的情况，就可以使用
// 方法---遍历指定的文件夹的指定文件，然后自动导入
// 用完之后就不需要每次就import了;
// require.context 接收三个参数
// 1:获取文件的路径
// 2:是布尔值---是否遍历文件的子目录
// 3:正则,匹配文件的正则
// require.context(文件路径,false,//)
// require.context 执行完毕之后返回一个对象,
// 可以调用三个方法
// resolve()---接收一个参数
// keys() ----返回匹配成功模块的名字组成的数组
// id   ----返回是一个字符串，执行环境的id
//现在只是做完导入了
let files = require.context("./",false,/\.js$/)
// files.keys  ---表示匹配成功的模块名称组成的数组;
//读取每个匹配成功的文件的default模块
let apis=files.keys().reduce((pre,item)=>{
     pre={
         ...pre,
         ...files(item).default
     }
     return pre
},{})

export default apis
