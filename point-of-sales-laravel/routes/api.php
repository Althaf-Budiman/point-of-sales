<?php

use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/menus', [MenuController::class, 'index']);

Route::post('/menus/create', [MenuController::class, 'store']);
Route::patch('/menus/edit/{menu}', [MenuController::class, 'update']);
Route::delete('/menus/delete/{menu}', [MenuController::class, 'destroy']);