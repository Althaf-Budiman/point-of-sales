<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::create([
            'name' => 'Dada Ayam',
            'price' => 8000,
        ]);

        Menu::create([
            'name' => 'Telur Rebus',
            'price' => 3000,
        ]);

        Menu::create([
            'name' => 'Tempe Goreng',
            'price' => 4000,
        ]);
    }
}
