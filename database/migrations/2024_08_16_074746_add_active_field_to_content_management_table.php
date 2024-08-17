<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('content_management', function (Blueprint $table) {
            $table->boolean('active')->default(false)->comment('only 1 row should be active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('content_management', function (Blueprint $table) {
            $table->dropColumn('active');
        });
    }
};
