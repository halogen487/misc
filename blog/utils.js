const fs = require("fs")
const path = require("path")
const yaml = require("yaml")

// id /foo/bar
// online /article/foo/bar
// local ./article/foo/bar.md
// or    ./article/foo/bar.md/.index

const localPath = function (id) {
	fPath = path.join(__dirname, "article", id)
	try {
		if (fs.statSync(fPath).isDirectory()) {
			fPath = path.join(fPath, ".index")
		}
	} catch (error) {
		// pass
	}
	return fPath
}

const writeArticle = async function ({id, type, md, props}) {
	console.log(`writing ${id}`)
	props.id = id
	let content = "---\n" + yaml.stringify(props) + "---\n\n" + md
	// recursively create dirs if they dont exist
	let dirs = []
	for (i of id.split(path.sep).slice(1, -1)) {
		dirs.push(i)
		let dirPath = path.join(__dirname, "article", dirs.join(path.sep))
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath)
		} else if (fs.statSync(dirPath).isFile()) {
			await makeDir(dirs.join(path.sep))
		}
	}
	let fPath = localPath(id)
	fs.writeFileSync(fPath, content)
}

const readArticle = async function (id) {
	let fPath = localPath(id)
	let content = fs.readFileSync(fPath).toString()
	return content
}

// not mkdir
const makeDir = function (id) {
	console.log("makeDir-ing")
	if (fs.statSync(localPath(id)).isFile()) {
		content = readArticleSync(id)
		fs.rmSync(localPath(id))
		fs.mkdirSync(localPath(id))
		fs.writeFileSync(path.join(localPath(id), ".index"), content)
		console.log("makeDir-ed")
	}
	// make dir with same name
	// copy file into it
	// rename to index
}

module.exports = {readArticle, writeArticle, makeDir}

// writeArticle({id: "/one/two/three/four", type: null, md: "# autowritten note\n", props: {autowritten: true}})
console.log(readArticle("one/two/three/four"))