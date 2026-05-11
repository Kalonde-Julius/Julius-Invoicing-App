<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

When in your Laravel Herd folder via CMD/terminal, locate your project directory: <br/> 
cd Julius-Invoicing-App <br/>
composer install <br/>

Rename the .env.example to .env or just create a .env file & copy & paste all the contents from .env.example into in. <br/>

Via CMD run the following commands when inside your project directory: <br/>

rmdir /s /q node_modules<br/>
del package-lock.json <br/>
npm cache clean --force <br/>
npm install --force <br/>
npm install --save-dev vite@7.0.7 @tailwindcss/vite@4.3.0 laravel-vite-plugin@2.0.0 <br/>

In Laravel Herd's Node version: Only choose Node version 20 since it has Long Term Support (LTS). Other Node versions may experience issues or even fail to work especially Node versions without LTS among the supported Node versions in Laravel Herd. <br/>

Via CMD run the following commands when inside your project directory: <br/>

php artisan key:generate <br/>
php artisan migrate:fresh <br/>
npm run dev <br/>
