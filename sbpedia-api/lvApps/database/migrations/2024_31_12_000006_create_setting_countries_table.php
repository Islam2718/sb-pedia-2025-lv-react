<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('setting_countries', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('country_name');
            $table->string('full_name');
            $table->string('iso3');
            $table->string('number');
            $table->string('continent_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('setting_countries');
    }
};
