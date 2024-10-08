<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::all();
        return response()->json([
            'menus' => $menus
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'image' => 'nullable|image'
        ]);

        $image_name = null;

        // if request has image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move('images', $image_name);
        }

        Menu::create([
            'name' => $request->name,
            'price' => $request->price,
            'image' => $image_name,
        ]);

        return response()->json([
            'message' => "Success to create item!"
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'image' => 'nullable|image'
        ]);

        $image_name = $menu->image;

        if($request->hasFile('image')) {
            if ($image_name && file_exists(public_path('images/' . $image_name))) {
                unlink(public_path('images/' . $image_name));
            }

            $image = $request->file('image');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move('images', $image_name);
        }

        $menu->update([
            'name' => $request->name,
            'price' => $request->price,
            'image' => $image_name,
        ]);

        return response()->json([
            'message' => 'Success to update an item!'
        ]);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return response()->json([
            'message' => 'Success to delete an item!'
        ]);
    }
}
