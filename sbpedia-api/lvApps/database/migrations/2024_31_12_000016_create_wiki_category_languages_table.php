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
        Schema::create('wiki_category_languages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wiki_category_id')->nullable();
            $table->unsignedBigInteger('setting_language_id')->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->tinyInteger('is_default')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->dateTime('created')->nullable();
            $table->dateTime('updated')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wiki_category_languages');
    }
};
