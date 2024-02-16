const path = require('path'); //утилита, которая превращает относительный путь в абсолютный
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist.
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //для обработки css

module.exports = {
	entry: { main: './src/index.js' }, //точка входа
	output: {
		path: path.resolve(__dirname, 'dist'), //точка выхода
			//dirname - эта переменная в Node.js доступна глобально. В ней хранится абсолютный путь до папки, в которой лежит файл, где мы используем эту переменную. В нашем случае абсолютный путь до папки с конфигом «Вебпака» — корневой папки нашего проекта.
		filename: 'main.js',
		publicPath: ''
	},
	mode: 'development', // добавили режим разработчика
	devServer: { //настройки локального сервера:
		static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
		compress: true, // это ускорит загрузку в режиме разработки
		port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
		open: true // сайт будет открываться сам при запуске npm run dev
	},
	module: {
		rules: [ // rules — это массив правил
			{ 		// добавим в него объект правил для бабеля
				test: /\.js$/, // регулярное выражение, которое ищет все js файлы
				use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
				exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
			},
			{
				test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
				type: 'asset/resource' //asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате.
			},
			{
				test: /\.css$/, // применять это правило только к CSS-файлам
				use: [MiniCssExtractPlugin.loader, { // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
					loader: 'css-loader',
					options: { importLoaders: 1 } //Если вы используете директиву @import https://webpack.js.org/loaders/css-loader/#importloaders
						//Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
				},
					'postcss-loader'
				]
			}
		]
	},
	plugins: [
		//https://webpack.js.org/plugins/html-webpack-plugin/#basic-usage
		new HtmlWebpackPlugin({ //HtmlWebpackPlugin - класс, с помощью которого можно конструировать объекты
			template: './src/index.html' // путь к файлу index.html
		}),
		new CleanWebpackPlugin(), // очищать директорию dist
		new MiniCssExtractPlugin() //Это подключит плагин для объединения css-файлов
	]
}