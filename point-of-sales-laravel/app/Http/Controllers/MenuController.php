<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index() {
        $menus = Menu::all();
        return response()->json([
            'menus' => $menus
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required'
        ]);

        Menu::create($validated);

        return response()->json([
            'message' => "Success to create item!"
        ]);
    }

    public function update(Request $request, Menu $menu) {
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required'
        ]);

        $menu->update($validated);

        return response()->json([
            'message' => 'Success to update an item!'
        ]);
    }

    public function destroy(Menu $menu) {
        $menu->delete();

        return response()->json([
            'message' => 'Success to delete an item!'
        ]);
    }
}
