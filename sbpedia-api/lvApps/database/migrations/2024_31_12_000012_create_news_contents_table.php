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
        Schema::create('news_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('person_id');
            $table->string('alias')->nullable();
            $table->tinyInteger('is_top_news')->nullable();
            $table->tinyInteger('is_featured')->nullable();
            $table->tinyInteger('is_organization_news')->nullable();
            $table->bigInteger('organization_id')->nullable();
            $table->tinyInteger('is_user_news')->nullable();
            $table->string('featured_image')->nullable();
            $table->string('tags')->nullable();
            $table->tinyInteger('link_type')->nullable();
            $table->string('custom_link')->nullable();
            $table->tinyInteger('is_target_blank')->nullable();
            $table->bigInteger('order')->nullable();
            $table->string('status')->nullable();
            $table->string('approve_status')->nullable();
            $table->dateTime('publish_date')->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->string('country_name')->nullable();
            $table->string('city_name')->nullable();
            $table->string('organization_name')->nullable();
            $table->bigInteger('activity_id')->nullable();
            $table->bigInteger('live_edited_by')->nullable();
            $table->tinyInteger('is_file')->nullable();
            $table->string('file_type')->nullable();
            $table->string('file_name')->nullable();
            $table->dateTime('created')->nullable();
            $table->dateTime('modified')->nullable();
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
        Schema::dropIfExists('news_contents');
    }
};
