'use strict';

module.exports = function(grunt) {
    /* package.jsonの内容を読み込む */
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        // jsファイルをminify
        uglify: {
            my_target: {
                options: {
                    // true にすると難読化がかかる。false だと関数や変数の名前はそのまま
                    mangle: true
                },
                files: {
                    'public/js/main.js':['js/main.js'],
                    'public/js/top.js':['js/top.js']
                }
            }
        },
        //ScssをCSSにコンパイル
        sass : {
            dev : {                        //devは任意の実行ターゲット名
                options : {                //optionsはSassの設定
                    style : 'expanded'
                },
                files   : {                //出力先css : 元のscssフォルダ
                    'public/css/style.css' : ['sass/style.scss']
                }
            },
            /*公開用distグループ
           dist : {
               options : {
                   style : 'compressed'    //スペースと改行を取り除き1行にする
               },
               files : {
                   'public/css/*.css' : ['sass/*.scss']
               }
           }*/
        },
        /* ファイルを監視 */
        watch: {
            /* htmlファイルの監視設定 */
            html: {
                files: '*.html',
                tasks: [],
                options: {
                    nospawn: true
                }
            },
            /* scssファイルの監視設定 */
            sass: {
                files: 'sass/*.scss',
                tasks: ['sass'],
                options: {
                    nospawn: true
                }
            },
            /* jsファイルの監視設定 */
            coffee: {
                files: 'js/*.js',
                tasks: ['uglify'],
                options: {
                    nospawn: true
                }
            }
        }//watchの記述ここまで

     });

    // Grnutfileに記載されているパッケージを自動読込
    var taskName;
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }
    grunt.registerTask('default',['watch']);
   // grunt.registerTask('eatwarnings', function() {
   //     grunt.warn = grunt.fail.warn = function(warning) {
   //         grunt.log.error(warning);
   //     };
   // });
};
