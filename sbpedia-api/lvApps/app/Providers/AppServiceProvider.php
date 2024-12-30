<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        RateLimiter::for('global', function (Request $request) {
            return Limit::perMinute(60);
        });
    
        RateLimiter::for('uploads', function (Request $request) {
            return Limit::perMinute(30);
        });        
    }
}
