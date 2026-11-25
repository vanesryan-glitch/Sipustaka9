<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\Buku\Models\Buku;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Petugas Perpustakaan',
            'email' => 'admin@sipustaka.test',
            'role' => UserRole::Admin,
            'password' => 'password',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Anggota Perpustakaan',
            'email' => 'user@sipustaka.test',
            'role' => UserRole::User,
            'password' => 'password',
            'email_verified_at' => now(),
        ]);

        // 12 data buku contoh agar pagination dapat diuji
        for ($i = 1; $i <= 12; $i++) {
            Buku::create([
                'judul' => 'Buku Contoh '.$i,
                'penulis' => fake()->name(),
                'penerbit' => fake()->company(),
                'tahun_terbit' => fake()->numberBetween(2000, 2024),
                'stok' => fake()->numberBetween(1, 20),
            ]);
        }
    }
}