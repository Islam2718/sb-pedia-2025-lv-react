<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\SiteinfoController;
use App\Http\Controllers\API\SocialController;
use App\Http\Controllers\API\UserauthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\StoreController;

use App\Http\Controllers\API\PageController;
use App\Http\Controllers\API\SectionController;
use App\Http\Controllers\API\WidgetController;

use App\Http\Controllers\API\TypeController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\LocationController;
use App\Http\Controllers\API\AdController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\StockController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderItemController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\SupplierController;
// report 
use App\Http\Controllers\API\ReportController;
// files 
use App\Http\Controllers\API\UploadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('throttle:60,1')->group(function () {
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('login', [UserauthController::class, 'userLogin']);
    Route::post('/register', [UserauthController::class, 'userRegister']);
    Route::post('/send-verification-code', [UserauthController::class, 'sendVarificationCode']);
    Route::post('/verify-code', [UserauthController::class, 'verifyCode']);
    Route::post('/change-password', [UserauthController::class, 'changePassword']);

    Route::resource('siteinfo', SiteinfoController::class)->only(['index', 'update']);
    Route::resource('social', SocialController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    
    Route::get('user-info', [UserauthController::class, 'getUserDetails']);
    Route::post('logout', [UserauthController::class, 'userLogout']);

    Route::resource('user', UserController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('store', StoreController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('store/{id}/set_default', 'App\Http\Controllers\API\StoreController@setDefaultCompany');

    Route::resource('page', PageController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('page/{id}/status', 'App\Http\Controllers\API\PageController@updateStatus');
    Route::resource('section', SectionController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('widget', WidgetController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('widget/{id}/status', 'App\Http\Controllers\API\WidgetController@updateStatus');

    Route::resource('types', TypeController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('category', CategoryController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('location', LocationController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('ad', AdController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('product', ProductController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('stock', StockController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('order', OrderController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('order-item', OrderItemController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('payment', PaymentController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('customer', CustomerController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('suplier', SupplierController::class)->only(['index', 'store', 'update', 'show', 'destroy']);

    // report 
    Route::get('report-due', [ReportController::class, 'due']);
    Route::get('report-dashboard', [ReportController::class, 'dashboard']);

    Route::get('files', 'App\Http\Controllers\API\UploadController@getAllFile');
    Route::post('upload-single', 'App\Http\Controllers\API\UploadController@uploadFile');
    Route::get('remove-file/{filename}', 'App\Http\Controllers\API\UploadController@deleteFile');
});
