# vue-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 修改源码，添加emotions 对class的支持
                    if (src) {
                        // 加一个 data-w-e 属性，点击图片的时候不再提示编辑图片
                        faceHtml += '<span class="w-e-item"><img src="' + src + '" alt="' + alt + '" class="' + _class + '" data-w-e="1"/></span>';
                    }

